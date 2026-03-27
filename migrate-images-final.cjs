const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const IMAGE_FOLDER = 'public/images';
const SOURCE_FOLDERS = ['src'];
const FILE_EXTENSIONS = ['.tsx', '.jsx', '.js', '.ts'];

// Fisiere extra scanate separat (nu sunt in src/)
const EXTRA_FILES = ['index.html'];

// WebP optimization settings
const WEBP_QUALITY = 82;

// Retry settings
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000; // 2 secunde intre reincercari

// ============================================================
// PATTERNS - prinde TOATE variantele de URL-uri Readdy/Static
// ============================================================
const URL_PATTERNS = [
  // https://readdy.ai/api/search-image?...
  /https:\/\/readdy\.ai\/api\/search-image[^"'\s\)>]*/g,
  // https://static.readdy.ai/image/.../....jpeg|png|webp|jpg
  /https:\/\/static\.readdy\.ai\/image\/[^"'\s\)>]*/g,
  // https://storage.readdy-site.link/project_files/... (imagini decorative PNG)
  /https:\/\/storage\.readdy-site\.link\/project_files\/[^"'\s\)>]*/g,
];

let sharpLib = null;

async function ensureSharp() {
  if (sharpLib) return sharpLib;

  try {
    sharpLib = require('sharp');
    return sharpLib;
  } catch (e) {
    console.log('\n   📦 Se instaleaza sharp global (o singura data)...');
    try {
      execSync('npm install -g sharp', { stdio: 'inherit' });
    } catch (err) {
      // fallback: instalam in tmp, nu in proiect
      const tmpDir = path.join(os.tmpdir(), 'sharp-tmp');
      fs.mkdirSync(tmpDir, { recursive: true });
      execSync(`npm install --prefix "${tmpDir}" sharp`, { stdio: 'inherit' });
      sharpLib = require(path.join(tmpDir, 'node_modules', 'sharp'));
      console.log('   ✅ sharp instalat in tmp!\n');
      return sharpLib;
    }

    try {
      const globalRoot = execSync('npm root -g').toString().trim();
      sharpLib = require(path.join(globalRoot, 'sharp'));
    } catch (e2) {
      const tmpDir = path.join(os.tmpdir(), 'sharp-tmp');
      fs.mkdirSync(tmpDir, { recursive: true });
      execSync(`npm install --prefix "${tmpDir}" sharp`, { stdio: 'inherit' });
      sharpLib = require(path.join(tmpDir, 'node_modules', 'sharp'));
    }

    console.log('   ✅ sharp instalat!\n');
    return sharpLib;
  }
}

function generateFileName(url, index) {
  // Pentru storage.readdy-site.link — extragem UUID-ul fisierului din URL
  // ex: /project_files/{proj-id}/{file-uuid}_nume-fisier.png
  const storageMatch = url.match(/\/([a-f0-9-]{36})_[^/?]+\.(jpeg|jpg|png|webp|gif)/i);
  if (storageMatch) {
    // Folosim primele 12 caractere din UUID (fara liniute)
    const shortId = storageMatch[1].replace(/-/g, '').slice(0, 12);
    return `${shortId}.webp`;
  }

  // Pentru storage.readdy-site.link fara UUID in format standard — folosim hash din query string
  const storageQMatch = url.match(/storage\.readdy-site\.link/);
  if (storageQMatch) {
    // Luam ultimul segment al path-ului si curatam
    const segments = url.split('/').filter(Boolean);
    const lastSeg = segments[segments.length - 1].split('?')[0];
    const clean = lastSeg
      .replace(/\.(jpeg|jpg|png|webp|gif)$/i, '')
      .replace(/[^a-z0-9]/gi, '-')
      .slice(0, 20)
      .toLowerCase();
    return `${clean || `deco-${index}`}.webp`;
  }

  // Pentru static.readdy.ai — folosim hash-ul din URL ca nume
  const staticMatch = url.match(/\/([a-f0-9]+)\.(jpeg|jpg|png|webp|gif)$/i);
  if (staticMatch) {
    return `${staticMatch[1].slice(0, 12)}.webp`;
  }

  // Pentru readdy.ai/api/search-image — folosim seq sau query
  const seqMatch = url.match(/seq=([^&"'\s]+)/);
  if (seqMatch) {
    const name = seqMatch[1].replace(/[^a-z0-9-]/gi, '-');
    return `${name}.webp`;
  }

  const queryMatch = url.match(/query=([^&"'\s]+)/);
  if (queryMatch) {
    const decoded = decodeURIComponent(queryMatch[1]);
    const words = decoded
      .split(/[%\s+]+/)
      .filter(w => w.length > 3)
      .slice(0, 3)
      .join('-')
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '');
    if (words) return `${words}.webp`;
  }

  return `image-${index}.webp`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function downloadToBuffer(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 10) return reject(new Error('Prea multe redirecturi'));

    const lib = url.startsWith('https') ? https : http;

    const request = lib.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ImageMigrator/3.0)',
      }
    }, (response) => {
      if ([301, 302, 307, 308].includes(response.statusCode)) {
        const location = response.headers.location;
        if (!location) return reject(new Error('Redirect fara Location header'));
        const nextUrl = location.startsWith('http') ? location : new URL(location, url).href;
        return downloadToBuffer(nextUrl, redirectCount + 1).then(resolve).catch(reject);
      }

      if (response.statusCode === 200) {
        const chunks = [];
        response.on('data', chunk => chunks.push(chunk));
        response.on('end', () => resolve(Buffer.concat(chunks)));
        response.on('error', reject);
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    });

    request.on('error', reject);
    request.setTimeout(45000, () => {
      request.destroy();
      reject(new Error('Timeout dupa 45s'));
    });
  });
}

// Wrapper cu retry automat
async function downloadToBufferWithRetry(url) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await downloadToBuffer(url);
    } catch (err) {
      lastError = err;
      if (attempt < MAX_RETRIES) {
        process.stdout.write(` ⚠️  Retry ${attempt}/${MAX_RETRIES - 1}...`);
        await sleep(RETRY_DELAY_MS * attempt); // backoff progresiv: 2s, 4s
      }
    }
  }
  throw lastError;
}

async function downloadAndOptimize(url, filepath) {
  const sharp = await ensureSharp();

  const buffer = await downloadToBufferWithRetry(url);
  const originalSize = buffer.length;

  let optimizedBuffer;
  try {
    optimizedBuffer = await sharp(buffer)
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();
  } catch (sharpErr) {
    // Daca sharp nu poate procesa, salvam originalul cu extensia corecta
    const ext = url.match(/\.(png|gif|jpeg|jpg|webp)$/i)?.[1] || 'jpg';
    const altPath = filepath.replace('.webp', `.${ext}`);
    fs.writeFileSync(altPath, buffer);
    return {
      originalSize: (originalSize / 1024).toFixed(1),
      optimizedSize: (originalSize / 1024).toFixed(1),
      saving: 0,
    };
  }

  const optimizedSize = optimizedBuffer.length;
  const saving = Math.round((1 - optimizedSize / originalSize) * 100);

  fs.writeFileSync(filepath, optimizedBuffer);

  return {
    originalSize: (originalSize / 1024).toFixed(1),
    optimizedSize: (optimizedSize / 1024).toFixed(1),
    saving,
  };
}

function findFiles(dir, extensions, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;

  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (!['node_modules', '.git', 'dist', 'build', '.next', '.vite', 'out'].includes(file)) {
        findFiles(filePath, extensions, fileList);
      }
    } else if (extensions.some(ext => file.endsWith(ext))) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function extractAllUrls(content) {
  const found = [];
  URL_PATTERNS.forEach(pattern => {
    pattern.lastIndex = 0;
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(url => {
        const clean = url.replace(/[,;'">\s]+$/, '');
        if (!found.includes(clean)) found.push(clean);
      });
    }
  });
  return found;
}

async function migrateImages() {
  console.log('\n🚀 READDY IMAGE MIGRATOR v3 — Full Coverage + WebP + Retry\n');
  console.log('='.repeat(60));
  console.log('📁 Project:', process.cwd());
  console.log(`🎨 WebP Quality: ${WEBP_QUALITY}/100`);
  console.log(`🔄 Retry: ${MAX_RETRIES} incercari, ${RETRY_DELAY_MS}ms intre ele`);
  console.log('🔍 Patterns:');
  console.log('   • readdy.ai/api/search-image');
  console.log('   • static.readdy.ai/image');
  console.log('   • storage.readdy-site.link/project_files  ← NOU');
  console.log('   • index.html (favicon + meta)             ← NOU');
  console.log('='.repeat(60));

  // ── STEP 1: Scan files ──────────────────────────────────────
  console.log('\n🔍 Step 1/5: Scanez fisierele proiectului...\n');

  let allFiles = [];
  SOURCE_FOLDERS.forEach(folder => {
    allFiles = allFiles.concat(findFiles(folder, FILE_EXTENSIONS));
  });

  // Adaugam fisierele extra (index.html etc.) daca exista
  EXTRA_FILES.forEach(f => {
    if (fs.existsSync(f)) {
      allFiles.push(f);
      console.log(`   ➕ Fisier extra adaugat: ${f}`);
    }
  });

  if (allFiles.length === 0) {
    console.log('❌ Nu am gasit fisiere sursa! Asigura-te ca esti in radacina proiectului.\n');
    return;
  }
  console.log(`   ✅ ${allFiles.length} fisiere de scanat\n`);

  // ── STEP 2: Find URLs ───────────────────────────────────────
  console.log('🔍 Step 2/5: Caut URL-uri de imagini...\n');

  const urlMap = new Map();
  let urlIndex = 0;

  allFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const urls = extractAllUrls(content);

      urls.forEach(url => {
        if (!urlMap.has(url)) {
          urlMap.set(url, { filename: generateFileName(url, urlIndex++), files: [] });
        }
        if (!urlMap.get(url).files.includes(file)) {
          urlMap.get(url).files.push(file);
        }
      });
    } catch (error) {
      console.log(`   ⚠️  Eroare la citire ${file}: ${error.message}`);
    }
  });

  if (urlMap.size === 0) {
    console.log('   ✅ Nicio imagine Readdy gasita. Proiect deja migrat!\n');
    return;
  }

  console.log(`   ✅ ${urlMap.size} imagini unice gasite:\n`);
  let n = 1;
  urlMap.forEach((data, url) => {
    const short = url.length > 70 ? url.slice(0, 67) + '...' : url;
    const isStorage = url.includes('storage.readdy-site.link') ? ' [decorativ]' : '';
    const isStatic = url.includes('static.readdy.ai') ? ' [static]' : '';
    console.log(`   ${n++}. ${data.filename}${isStorage}${isStatic}`);
    console.log(`      URL: ${short}`);
    console.log(`      Fisiere: ${data.files.length}`);
  });
  console.log('');

  // ── STEP 3: Create folder ───────────────────────────────────
  console.log('📁 Step 3/5: Pregatesc folderul de imagini...\n');
  if (!fs.existsSync(IMAGE_FOLDER)) {
    fs.mkdirSync(IMAGE_FOLDER, { recursive: true });
    console.log(`   ✅ Creat: ${IMAGE_FOLDER}\n`);
  } else {
    console.log(`   ✅ Folder exista: ${IMAGE_FOLDER}\n`);
  }

  // Pre-load sharp
  await ensureSharp();

  // ── STEP 4: Download + optimize (cu retry) ──────────────────
  console.log('⬇️  Step 4/5: Descarcare + conversie WebP (cu retry automat)...\n');

  let successCount = 0;
  let failCount = 0;
  const failedUrls = [];
  let totalOriginalKB = 0;
  let totalOptimizedKB = 0;

  for (const [url, data] of urlMap.entries()) {
    const filepath = path.join(IMAGE_FOLDER, data.filename);

    // Skip daca fisierul exista deja (re-run safe)
    if (fs.existsSync(filepath)) {
      const existingSize = (fs.statSync(filepath).size / 1024).toFixed(1);
      console.log(`   ⏭️  ${data.filename} ... deja exista (${existingSize}KB), sarit`);
      successCount++;
      continue;
    }

    process.stdout.write(`   ⏳ ${data.filename} ... `);

    try {
      const stats = await downloadAndOptimize(url, filepath);
      totalOriginalKB += parseFloat(stats.originalSize);
      totalOptimizedKB += parseFloat(stats.optimizedSize);
      const sign = stats.saving >= 0 ? '-' : '+';
      console.log(`✅  ${stats.originalSize}KB → ${stats.optimizedSize}KB (${sign}${Math.abs(stats.saving)}%)`);
      successCount++;
    } catch (error) {
      console.log(`❌ (${error.message})`);
      failCount++;
      failedUrls.push({ url, filename: data.filename, error: error.message });
    }
  }

  console.log('');
  const totalSaving = totalOriginalKB > 0 ? Math.round((1 - totalOptimizedKB / totalOriginalKB) * 100) : 0;
  console.log(`   📊 Success: ${successCount} | Esuate: ${failCount}`);
  if (successCount > 0 && totalOriginalKB > 0) {
    console.log(`   🗜️  Total: ${totalOriginalKB.toFixed(1)}KB → ${totalOptimizedKB.toFixed(1)}KB (economisit ${totalSaving}%)\n`);
  }

  if (failedUrls.length > 0) {
    console.log('⚠️  Imagini care au esuat dupa toate reincercarile:\n');
    failedUrls.forEach(item => {
      console.log(`   • ${item.filename}: ${item.error}`);
      const shortUrl = item.url.length > 80 ? item.url.slice(0, 77) + '...' : item.url;
      console.log(`     URL: ${shortUrl}`);
    });
    console.log('\n   💡 Tip: Descarca-le manual si pune-le in public/images/\n');
  }

  // ── STEP 5: Update code ─────────────────────────────────────
  console.log('🔄 Step 5/5: Actualizez codul sursa...\n');

  let filesUpdated = 0;
  let replacementsCount = 0;

  // Actualizam toate fisierele (src/ + index.html)
  allFiles.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      let modified = false;
      let fileReplacements = 0;

      urlMap.forEach((data, url) => {
        if (content.includes(url)) {
          const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const occurrences = (content.match(new RegExp(escaped, 'g')) || []).length;
          content = content.replaceAll(url, `/images/${data.filename}`);
          modified = true;
          fileReplacements += occurrences;
          replacementsCount += occurrences;
        }
      });

      if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        const relativePath = path.relative(process.cwd(), file);
        console.log(`   ✅ ${relativePath} (${fileReplacements} inlocuire(i))`);
        filesUpdated++;
      }
    } catch (error) {
      console.log(`   ❌ Eroare la ${file}: ${error.message}`);
    }
  });

  console.log('');
  console.log(`   📊 ${filesUpdated} fisiere actualizate (${replacementsCount} inlocuiri totale)\n`);

  // ── SUMMARY ─────────────────────────────────────────────────
  console.log('='.repeat(60));
  if (failCount === 0) {
    console.log('✅ MIGRARE + OPTIMIZARE COMPLETA! 100% independent de Readdy.');
  } else {
    console.log(`⚠️  MIGRARE COMPLETA CU ${failCount} ERORI — verifica manual imaginile de mai sus`);
  }
  console.log('='.repeat(60));
  console.log('\n📋 Rezumat:');
  console.log(`   • Imagini descarcate si WebP: ${successCount}/${urlMap.size}`);
  if (totalOriginalKB > 0) {
    console.log(`   • Reducere totala: ${totalOriginalKB.toFixed(1)}KB → ${totalOptimizedKB.toFixed(1)}KB (-${totalSaving}%)`);
  }
  console.log(`   • Fisiere actualizate: ${filesUpdated}`);
  console.log(`   • Inlocuiri totale: ${replacementsCount}`);
  console.log('\n🎯 Urmatorii pasi:\n');
  console.log('   1. Testeaza local: npm run dev');
  console.log('   2. Verifica imaginile in browser (inclusiv decorative si favicon)');
  console.log('   3. Push: git add . && git commit -m "Images migrated v3 - fully offline" && git push');
  console.log('   4. Vercel auto-deploy! 🚀\n');
}

migrateImages().catch(error => {
  console.error('\n❌ EROARE FATALA:', error.message);
  console.error('\nChecklist:');
  console.error('  • Esti in radacina proiectului?');
  console.error('  • Exista folderul src/?');
  console.error('  • Ai conexiune la internet?');
  console.error('  • Incearca manual: npm install -g sharp\n');
  process.exit(1);
});
