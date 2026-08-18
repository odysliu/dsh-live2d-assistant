/*!
 * BD2 每日立绘 · 直接渲染进 DSH 会话区（spine，无 UI、背景透明）
 * 资源: https://jelosus2.github.io/BD2-L2D-Viewer/assets/spines/ (官方 spine 资源)
 * 渲染: @esotericsoftware/spine-player 4.1.55 (CDN)
 * 逻辑: 按本地日期选角色，每天 0 点轮换；只渲染角色本身，无按钮无菜单
 */
(function () {
  'use strict';
  var CHARS = [
  ["000101", "Lathel", "Herb Tracker"],
  ["000102", "Lathel", "Lonely Survivor"],
  ["000103", "Lathel", "Homunculus"],
  ["000104", "Lathel", "Dark Knight"],
  ["000105", "Lathel", "Promise of Vengeance"],
  ["000201", "Justia", "Knight of Blood"],
  ["000202", "Justia", "White Reaper"],
  ["000203", "Justia", "Blood Glutton"],
  ["000204", "Justia", "Kendo Club"],
  ["000206", "Justia", "Pool Party"],
  ["000296", "Justia", "Hot Summer Dream"],
  ["000301", "Scheherazade", "The Lapis Witch"],
  ["000303", "Scheherazade", "The Magic School Professor"],
  ["000304", "Scheherazade", "Code Name S"],
  ["000396", "Scheherazade", "Deliberate Ace"],
  ["000401", "Gray", "The Sharpshooter of the Mist"],
  ["000402", "Gray", "B-Rank Manager"],
  ["000403", "Gray", "Vanguard"],
  ["000406", "Gray", "Pool Party"],
  ["000501", "Rou", "White Cat"],
  ["000502", "Rou", "Red Riding Hood"],
  ["000504", "Rou", "Nature's Claw"],
  ["000506", "Rou", "Stray Cat"],
  ["000601", "Olstein", "The Fiend Scholar"],
  ["000604", "Olstein", "Sage of Blue Clouds"],
  ["000701", "Eclipse", "Dimension Witch"],
  ["000706", "Eclipse", "Nightmare Bunny"],
  ["000707", "Eclipse", "Beach Vacation"],
  ["000801", "Rubia", "Thorn of the Desert"],
  ["000804", "Rubia", "The Empress of the Ocean"],
  ["000806", "Rubia", "Maid Name C"],
  ["000807", "Rubia", "Maid Bikini"],
  ["001001", "Sylvia", "Desert Flower"],
  ["001002", "Sylvia", "The Sword Queen"],
  ["001004", "Sylvia", "Admiral"],
  ["001006", "Sylvia", "Bikini Agent"],
  ["001092", "Sylvia", "Crimson Lotus"],
  ["001101", "Teresse", "Angel of Destruction"],
  ["001103", "", ""],
  ["001106", "Teresse", "Medical Club"],
  ["001107", "Teresse", "Beachside Angel"],
  ["001197", "Teresse", "Milky Bikini"],
  ["001201", "Liatris", "Rodev's Star"],
  ["001206", "Liatris", "Neon Stalker"],
  ["001207", "Liatris", "Maid Name R"],
  ["002401", "Diana", "Adventurer of the Unknown"],
  ["002403", "Diana", "Magical Innovator"],
  ["002406", "Diana", "Anti-dystopia"],
  ["003001", "Layla", "Anvil of Creation"],
  ["003202", "Loen", "Track and Field Team"],
  ["003203", "Loen", "Celebrity Bunny"],
  ["003301", "Nebris", "Labyrinth Gatekeeper"],
  ["003302", "Nebris", "Laid-back Lifeguard"],
  ["003303", "Nebris", "New Hire"],
  ["003392", "Nebris", "Lucky Bikini"],
  ["003401", "Morpeah", "Beach Vacation"],
  ["003403", "Morpeah", "Apostle"],
  ["003602", "Olivier", "Apostle"],
  ["003603", "Olivier", "Fallen Wings"],
  ["003604", "Olivier", "Retired Legend"],
  ["003701", "Blade", "Apostle"],
  ["003702", "Blade", "Onsen Swordfighter"],
  ["003703", "Blade", "Young Lady"],
  ["003801", "Liberta", "Dark Saintess"],
  ["003802", "Liberta", "Onsen Manager"],
  ["003803", "Liberta", "Miracle Rose"],
  ["003892", "Liberta", "Hedonist"],
  ["003901", "Sonya", "Shadowed Dream"],
  ["003902", "Sonya", "Little Pumpkin Girl"],
  ["004001", "Darian", "Prophetic Dream"],
  ["004002", "Darian", "Bittersweet Bunny"],
  ["004091", "Darian", "Herald of Enlightenment"],
  ["004102", "Tyr", "Innocent Bunny"],
  ["004201", "Palette", "Shattered Dream"],
  ["004202", "Palette", "Miracle Violet"],
  ["004301", "Nekyndalia", "Deadeye"],
  ["020001", "Eris", "Esteemed Adventurer"],
  ["020002", "Eris", "Your Very Own Cat"],
  ["020101", "Roxy", "Respected Master"],
  ["020102", "Roxy", "Emerging Desire"],
  ["020201", "Yomi", "Gentle Destroyer"],
  ["020301", "Yozakura", "Fist of Conviction"],
  ["020501", "Hikage", "Kind Ruthlessness"],
  ["020601", "Goblin Slayer", "Orcbolg"],
  ["020701", "Priestess", "Earth Mother Believer"],
  ["020801", "High Elf Archer", "Daughter of Starwind"],
  ["020901", "Sword Maiden", "Supreme God Archbishop"],
  ["021001", "Ikaruga", "Noble Flame"],
  ["060301", "Alec", "The Destruction"],
  ["060302", "Alec", "Sword Breaker"],
  ["060403", "Celia", "Masquerade Bunny"],
  ["060501", "Anastasia", "Gentle Maid"],
  ["060502", "Anastasia", "Fire Graffiti"],
  ["060601", "Lecliss", "Killer Doll"],
  ["060602", "Lecliss", "Android Queen"],
  ["060701", "Rafina", "Steel Engine"],
  ["060702", "Rafina", "Code Name A"],
  ["060706", "Rafina", "Game Club"],
  ["060801", "Elise", "Lovely Lady"],
  ["060802", "Elise", "Code Name O"],
  ["060804", "Elise", "Naive Lady"],
  ["061002", "Helena", "B-Rank Idol"],
  ["061003", "Helena", "Sunny Inn Hand"],
  ["061092", "Helena", "Rising Star"],
  ["061101", "Eleaneer", "Piercing Magic Bow"],
  ["061102", "Eleaneer", "B-Rank Idol"],
  ["061302", "Dalvi", "Bright Moon"],
  ["061305", "Dalvi", "Summer Vacation"],
  ["061306", "Dalvi", "Tricky Lover"],
  ["061392", "Dalvi", "Butterfly Dream"],
  ["061402", "Zenith", "Robin Hood"],
  ["061404", "Zenith", "Poolside Guardian"],
  ["061492", "Zenith", "Stranger Bunny"],
  ["062002", "Andrew", "Specialist"],
  ["063001", "Ingrid", "Kardis' Bullet"],
  ["063301", "Cynthia", "Warmth within the Severe Cold"],
  ["063401", "Julie", "Healer"],
  ["065102", "Yuri", "Whitebolt"],
  ["065103", "Yuri", "Comeback Idol"],
  ["065193", "Yuri", "Forever Mascot"],
  ["065802", "Nartas", "Anonymous Sage"],
  ["066401", "Angelica", "The Fallen"],
  ["066402", "Angelica", "Pool Party"],
  ["066403", "Angelica", "Neon Savior"],
  ["066801", "Refithea", "The Gluttonous"],
  ["066802", "Refithea", "Pure White Blessing"],
  ["066803", "Refithea", "Poolside Fairy"],
  ["066902", "Glacia", "Alice"],
  ["066906", "Glacia", "Disciplinary Committee"],
  ["066907", "Glacia", "Heavenly Guardian Successor"],
  ["067002", "Ventana", "Snow White"],
  ["067003", "Ventana", "Comeback Idol"],
  ["067101", "Granhildr", "The Void"],
  ["067103", "Granhildr", "Boo Ghost"],
  ["067104", "Granhildr", "Combat Medic"],
  ["067201", "Venaka", "DJ"],
  ["067202", "Venaka", "Wind Dancer"],
  ["067301", "Levia", "Track and Field Captain"],
  ["067302", "Levia", "Night of Jealousy"],
  ["067303", "Levia", "Overheat"],
  ["067401", "Michaela", "Beachside Justice"],
  ["067402", "Michaela", "Queen of Signatures"],
  ["067403", "Michaela", "Acting Archbishop"],
  ["067491", "Michaela", "True Liberation"],
  ["067502", "Luvencia", "Deal Snatcher"],
  ["067503", "Luvencia", "Wild Dog"],
  ["067504", "Luvencia", "Ocean Vanguard"],
  ["067601", "Wilhelmina", "Iron Monarch"],
  ["067603", "Wilhelmina", "Water Park Queen"],
  ["067701", "Granadair", "Shrine Maiden of Purification"],
  ["067702", "Granadair", "Queen of Gluttis"],
  ["067803", "Mamonir", "Miracle Marine"],
  ["100101", "", ""],
  ["100201", "", ""],
  ["100301", "", ""],
  ["100501", "", ""],
  ["100502", "", ""],
  ["100601", "", ""],
  ["100801", "", ""],
  ["101101", "", ""],
  ["101102", "", ""],
  ["101103", "", ""],
  ["101201", "", ""],
  ["101202", "", ""],
  ["101301", "", ""],
  ["101302", "", ""],
  ["101401", "", ""],
  ["101402", "", ""],
  ["101501", "", ""],
  ["101502", "", ""],
  ["101601", "", ""],
  ["103301", "", ""],
  ["103401", "", ""],
  ["103501", "", ""],
  ["103601", "", ""],
  ["103701", "", ""]
  ];
  // 渲染库多源加载：本地 dist 优先（同源零网络依赖），unpkg / jsdelivr 备用
  var SPINE_CDNS = [
    '/assets/vendor/spine-player.min.js',
    'https://unpkg.com/@esotericsoftware/spine-player@4.1.55/dist/iife/spine-player.min.js',
    'https://cdn.jsdelivr.net/npm/@esotericsoftware/spine-player@4.1.55/dist/iife/spine-player.min.js'
  ];
  var ASSET_BASE = 'https://jelosus2.github.io/BD2-L2D-Viewer/assets/spines/';
  var PANEL_W = 'clamp(240px, 24vw, 340px)';

  var state = { container: null, player: null, char: null, obs: null, loaded: false, cam: null, bounds: null, anims: null, animIdx: 0, zoomed: false, clickTimer: null };

  function todayKey() {
    var d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }
  function pickIndex() {
    var k = todayKey();
    var h = (k ^ (k >>> 13)) >>> 0;
    h = ((h * 2654435761) >>> 0) ^ (h >>> 16);
    return h % CHARS.length;
  }

  var STYLE = [
    '#bd2-live{position:fixed;top:14px;right:16px;width:clamp(240px,22vw,320px);height:min(62vh,540px);z-index:9999;pointer-events:none;display:flex;align-items:flex-end;justify-content:center;overflow:visible}',
    '#bd2-live canvas{pointer-events:auto;cursor:pointer}',
    '#bd2-live .bd2-menu{position:absolute;top:0;right:calc(100% + 8px);width:206px;max-height:100%;display:flex;flex-direction:column;background:rgba(10,20,38,.95);border:1px solid rgba(120,170,220,.32);border-radius:10px;overflow:hidden;pointer-events:auto;z-index:10001;box-shadow:0 10px 26px rgba(5,12,25,.55);font-family:"PingFang SC",system-ui,sans-serif;animation:bd2-in .15s ease both}',
    '#bd2-live .bd2-menu .bd2-head{padding:8px 10px;font-size:11px;font-weight:600;color:#e8f1fb;border-bottom:1px solid rgba(120,170,220,.18);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '#bd2-live .bd2-menu .bd2-sec{padding:6px 10px 3px;font-size:10px;color:#7fd0ff;letter-spacing:.5px}',
    '#bd2-live .bd2-menu .bd2-list{overflow-y:auto;flex:1;min-height:36px;padding:2px 6px 6px}',
    '#bd2-live .bd2-menu .bd2-list button{display:block;width:100%;text-align:left;background:transparent;border:0;color:#c6d8ee;font:11px/1.6 "PingFang SC",system-ui,sans-serif;padding:3px 8px;border-radius:6px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '#bd2-live .bd2-menu .bd2-list button:hover{background:rgba(120,170,220,.18);color:#fff}',
    '#bd2-live .bd2-menu .bd2-list button.active{background:rgba(90,160,230,.3);color:#fff}',
    '#bd2-live .bd2-menu .bd2-list::-webkit-scrollbar{width:6px}',
    '#bd2-live .bd2-menu .bd2-list::-webkit-scrollbar-thumb{background:rgba(120,170,220,.3);border-radius:3px}',
    '#bd2-live canvas,#bd2-live .spine-player{width:100% !important;height:100% !important}',
    '#bd2-live .bd2-load{position:absolute;left:50%;top:45%;transform:translate(-50%,-50%);width:26px;height:26px;border:3px solid rgba(140,175,215,.18);border-top-color:rgba(140,175,215,.75);border-radius:50%;animation:bd2-spin .8s linear infinite}',
    '@keyframes bd2-spin{to{transform:translate(-50%,-50%) rotate(360deg)}}',
    '#bd2-live.bd2-hide{display:none}'
  ].join('\n');

  // 面板内状态文字（跟随 spinner 显示加载到哪一步）
  function setStatus(text) {
    if (!state.container) return;
    var t = state.container.querySelector('.bd2-status');
    if (!t) {
      t = document.createElement('div');
      t.className = 'bd2-status';
      t.style.cssText = 'position:absolute;left:50%;top:calc(45% + 26px);transform:translateX(-50%);font:10.5px/1.5 "PingFang SC",system-ui,sans-serif;color:#8fa9c8;text-align:center;white-space:nowrap';
      state.container.appendChild(t);
    }
    t.textContent = text;
  }

  function loadSpineLib() {
    if (window.spine && window.spine.SpinePlayer) return Promise.resolve(window.spine);
    return new Promise(function (resolve, reject) {
      var idx = 0;
      function tryNext() {
        if (idx >= SPINE_CDNS.length) { reject(new Error('渲染库全部源加载失败')); return; }
        var s = document.createElement('script');
        s.src = SPINE_CDNS[idx++];
        var done = false;
        var timer = setTimeout(function () { if (!done) { s.remove(); tryNext(); } }, 8000);
        s.onload = function () { done = true; clearTimeout(timer); resolve(window.spine); };
        s.onerror = function () { done = true; clearTimeout(timer); tryNext(); };
        document.head.appendChild(s);
      }
      tryNext();
    });
  }

  function pageBgColor() {
    // 沿祖先链找第一个非透明的背景色，与 dsh 主题保持一致
    var el = document.body;
    while (el) {
      var c = getComputedStyle(el).backgroundColor;
      if (c && c !== 'transparent' && c !== 'rgba(0, 0, 0, 0)' && !/rgba\(0,\s*0,\s*0,\s*0\)/.test(c)) return c;
      el = el.parentElement;
    }
    return 'rgb(13, 22, 36)';
  }
  function rgbToHex(rgb) {
    var m = rgb.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/);
    if (!m) return '#0d1624';
    return '#' + [m[1], m[2], m[3]].map(function (v) {
      var h = (+v).toString(16);
      return h.length === 1 ? '0' + h : h;
    }).join('');
  }

  // 相机适配（官方机制）：计算可视区写入 config.viewport，再重播动画触发应用。
  // SpinePlayer 渲染循环每帧用 currentViewport（由 setViewport 读 config.viewport 生成）驱动相机，
  // 所以直接改 camera 会被覆盖；改 config.viewport 才是正解。
  // 立绘场景高度优先：角色高度始终填满面板（上下贴边），宽度按容器比例（窄则左右裁剪，宽则左右留白）。
  function applyViewport(p) {
    if (!p || !p.skeleton || !p.canvas) return;
    try {
      // 使用固定 bounds（加载时计算），避免动画帧 pose 变化导致高度飘忽
      var b = state.bounds;
      if (!b || !(b.w > 0) || !(b.h > 0)) return;
      var canvas = p.canvas;
      var ca = canvas.height / canvas.width;   // 容器高宽比
      var vw, vh;
      if (state.zoomed) {
        // 放大模式：高度填满 + 宽度完整（面板宽高比已按角色比例设置，可同时满足）
        vw = Math.max(b.h / ca, b.w);
        vh = vw * ca;
      } else {
        // 默认模式：自动最优——比较「裁宽损失」与「留高损失」，选损失小的方向
        var cropW = 1 - (b.h / ca) / b.w;   // 高度填满所需的裁宽比例（>0 表示会裁宽）
        var leaveH = 1 - b.h / (b.w * ca);  // 宽度完整所需的留高比例（>0 表示会留高）
        if (cropW <= leaveH) {
          // 裁宽损失更小（或瘦长角色无需裁）：高度填满
          vh = b.h;
          vw = b.h / ca;
        } else {
          // 留高损失更小：宽度完整，高度留白
          vw = b.w;
          vh = b.w * ca;
        }
      }
      var vx = b.x + (b.w - vw) / 2;      // 水平居中
      var vy = b.y + (b.h - vh) / 2;      // 垂直居中（有留白时上下均匀）
      var k = 0.97;  // 留 3% 余量防贴边
      p.config.viewport = {
        x: vx, y: vy,
        width: Math.max(vw * k, 1),
        height: Math.max(vh * k, 1),
        padLeft: 0, padRight: 0, padTop: 0, padBottom: 0,
        transitionTime: 0,
        // 必须保留：SpinePlayer.setViewport 内部会访问 viewport.animations[动画名]
        animations: {}
      };
      // 重播当前动画，触发 setViewport 应用新的 config.viewport
      if (state.anims && state.anims.length) {
        try {
          p.setAnimation(state.anims[state.animIdx] || state.anims[0], true);
          p.play && p.play();
        } catch (e) {}
      }
    } catch (e) {}
  }

  // 把错误转成可读信息（含堆栈前两行，便于定位）
  function errDetail(e) {
    if (!e) return '未知错误';
    var msg = e.message || String(e);
    var stack = e.stack ? e.stack.split('\n').slice(0, 2).join(' ') : '';
    return msg + (stack ? '\n' + stack : '');
  }

  // 在面板中央显示错误/提示信息（替代无限转圈）
  function showMsg(msg) {
    if (!state.container) return;
    state.container.innerHTML = '';
    var d = document.createElement('div');
    d.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:14px;font:11px/1.7 "PingFang SC",system-ui,sans-serif;color:#e0a9a9;word-break:break-all;white-space:pre-wrap';
    d.textContent = msg;
    state.container.appendChild(d);
  }

  var hideTimer = null;
  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      var m = state.container && state.container.querySelector('.bd2-menu');
      if (m) m.remove();
    }, 350);
  }
  function cancelHide() { clearTimeout(hideTimer); }

  // 输入框（composer）上边缘的视口 Y 坐标；找不到时用视口高度 - 160 兜底
  function getComposerTop() {
    var el = document.querySelector('[data-composer-seat]') ||
             document.querySelector('[data-composer-card]') ||
             document.querySelector('[data-input-backdrop]');
    if (el) {
      var r = el.getBoundingClientRect();
      if (r && r.top > 0 && isFinite(r.top)) return r.top;
    }
    return window.innerHeight - 160;
  }

  // 角色宽高比（放大时面板按此比例，让「高度填满 + 宽度完整」同时成立）
  function charAspect() {
    return state.bounds && state.bounds.w > 0 ? state.bounds.h / state.bounds.w : 2.0;
  }

  // 双击放大/恢复：最大高度不超过输入框上边缘
  function toggleZoom() {
    var c = state.container;
    if (!c) return;
    if (!state.zoomed) {
      var top = 14;
      var limit = getComposerTop();
      var ba = charAspect();
      var h = Math.max(220, limit - top - 10);
      var w = Math.round(h / ba);                       // 面板宽高比 = 角色比例
      w = Math.min(Math.max(280, w), 640);              // 宽度下限 280 / 上限 640
      if (w === 640 && h / ba > 640) h = Math.round(640 * ba);  // 宽度触顶时降低高度保持比例
      c.style.width = w + 'px';
      c.style.height = h + 'px';
      c.style.top = top + 'px';
      state.zoomed = true;
    } else {
      c.style.width = '';
      c.style.height = '';
      c.style.top = '';
      state.zoomed = false;
    }
    if (state.loaded && state.player) {
      setTimeout(function () { applyViewport(state.player); }, 60);
    }
  }

  // 悬停时构建并显示「动作 + 角色」菜单
  function showMenus() {
    var c = state.container;
    if (!c || !state.char) return;
    var old = c.querySelector('.bd2-menu');
    if (old) old.remove();
    cancelHide();

    var menu = document.createElement('div');
    menu.className = 'bd2-menu';

    var head = document.createElement('div');
    head.className = 'bd2-head';
    head.textContent = (state.char[1] || state.char[0]) + ' · ' + (state.char[2] || '');
    menu.appendChild(head);

    // 动作列表
    var secA = document.createElement('div');
    secA.className = 'bd2-sec';
    secA.textContent = '动作（点击切换）';
    menu.appendChild(secA);
    var listA = document.createElement('div');
    listA.className = 'bd2-list';
    (state.anims || []).forEach(function (nm, i) {
      var b = document.createElement('button');
      b.textContent = nm;
      if (i === state.animIdx) b.classList.add('active');
      b.onclick = function () {
        state.animIdx = i;
        try {
          state.player.setAnimation(nm, true);
          state.player.play && state.player.play();
          showAnimName(nm);
        } catch (e) {
          showAnimName('切换失败: ' + (e && e.message));
        }
        // 刷新高亮
        listA.querySelectorAll('button').forEach(function (x, j) { x.classList.toggle('active', j === state.animIdx); });
      };
      listA.appendChild(b);
    });
    menu.appendChild(listA);

    // 角色列表
    var secC = document.createElement('div');
    secC.className = 'bd2-sec';
    secC.textContent = '角色（点击切换）';
    menu.appendChild(secC);
    var listC = document.createElement('div');
    listC.className = 'bd2-list';
    CHARS.forEach(function (ch) {
      var b = document.createElement('button');
      b.textContent = (ch[1] || ch[0]) + (ch[2] ? ' · ' + ch[2] : '');
      if (ch[0] === state.char[0]) b.classList.add('active');
      b.onclick = function () {
        if (ch[0] !== state.char[0]) {
          state.char = ch;
          renderChar(ch);   // 重新加载渲染
        }
      };
      listC.appendChild(b);
    });
    menu.appendChild(listC);

    menu.onmouseenter = cancelHide;
    menu.onmouseleave = scheduleHide;
    c.appendChild(menu);
  }

  // 在面板底部短暂显示当前动作名
  function showAnimName(nm) {
    if (!state.container) return;
    var old = state.container.querySelector('.bd2-anim');
    if (old) old.remove();
    var d = document.createElement('div');
    d.className = 'bd2-anim';
    d.style.cssText = 'position:absolute;left:50%;bottom:12px;transform:translateX(-50%);background:rgba(12,24,44,.72);color:#cfe4fb;font:11px/1.5 "PingFang SC",system-ui,sans-serif;padding:3px 12px;border-radius:999px;pointer-events:none;transition:opacity .4s;white-space:nowrap';
    d.textContent = '动作: ' + nm;
    state.container.appendChild(d);
    setTimeout(function () { d.style.opacity = '0'; }, 1500);
    setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 2100);
  }

  function renderChar(c) {
    try {
      renderCharInner(c);
    } catch (e) {
      showMsg('渲染出错: ' + errDetail(e));
    }
  }

  function renderCharInner(c) {
    if (!c || !c[0]) { showMsg('角色数据异常（' + String(c) + '），请刷新页面'); return; }
    if (state.clickTimer) { clearTimeout(state.clickTimer); state.clickTimer = null; }
    var container = state.container;
    if (state.player) { try { state.player.dispose(); } catch (e) {} state.player = null; }
    container.innerHTML = '';
    state.loaded = false;
    var spin = document.createElement('div');
    spin.className = 'bd2-load';
    container.appendChild(spin);
    setStatus('创建渲染器…');

    var spine = window.spine;
    if (!spine || !spine.SpinePlayer) { spin.remove(); showMsg('spine-player 库加载失败'); return; }
    var skelUrl = ASSET_BASE + c[0] + '/char' + c[0] + '.skel';
    var atlasUrl = ASSET_BASE + c[0] + '/char' + c[0] + '.atlas';
    var p;
    try {
      p = new spine.SpinePlayer(container, {
        showControls: false,
        binaryUrl: skelUrl,
        atlasUrl: atlasUrl,
        skin: 'default',
        // 透明背景：用 8 位 hex（RGBA，alpha=0），'transparent' 字面量不被 spine 颜色解析器识别会回退成黑色
        backgroundColor: '#00000000',
        showLoading: false,
        premultipliedAlpha: false,
        alpha: true,
        preserveDrawingBuffer: true
      });
    } catch (e) {
      spin.remove();
      showMsg('SpinePlayer 初始化失败: ' + errDetail(e));
      return;
    }
    // 独立绝对超时（不依赖轮询）：25s 未就绪必报错
    var absTimer = setTimeout(function () {
      if (!state.loaded) {
        spin.remove();
        showMsg('加载超时（25s）\n' + skelUrl + '\n请检查网络后刷新');
      }
    }, 25000);
    // 等待加载完成（轮询 skeleton 就绪，不依赖事件名）
    var tries = 0;
    setStatus('下载角色资源…（首次约 2-5 秒）');
    var iv = setInterval(function () {
      try {
        if (p.skeleton && p.skeleton.data && p.skeleton.data.animations && p.skeleton.data.animations.length) {
          clearInterval(iv);
          clearTimeout(absTimer);
          spin.remove();
          state.loaded = true;
          // 固定包围盒：在 setAnimation 之前（setup pose）算一次并存起来，
          // 之后所有适配都用这个固定值 —— 动画帧 pose 变化不会导致高度飘忽
          try {
            var V2 = window.spine && window.spine.Vector2;
            if (V2) {
              var off = new V2(), size = new V2();
              p.skeleton.getBounds(off, size);
              if (size.x > 0 && size.y > 0) {
                state.bounds = { x: off.x, y: off.y, w: size.x, h: size.y };
              }
            }
          } catch (e) {}
          var anims = p.skeleton.data.animations;
          state.anims = anims.map(function (a) { return a.name; });
          state.animIdx = 0;
          var name = state.anims.some(function (n) { return n === 'idle'; }) ? 'idle' : state.anims[0];
          state.animIdx = state.anims.indexOf(name);
          p.setAnimation(name, true);
          // 确保播放：SpinePlayer 加载完成后可能自动 pause，延迟再 play 一次
          setTimeout(function () { try { p.play && p.play(); } catch (e) {} }, 200);
          // 等动画应用后再一次性设置相机，避免被动画自带 viewport 覆盖
          setTimeout(function () { applyViewport(p); }, 60);
          // 单击切换动作（延迟 260ms 区分双击）；双击放大/恢复
          state.container.style.cursor = 'pointer';
          state.container.onclick = function (ev) {
            if (ev.target.closest && ev.target.closest('.bd2-menu')) return;  // 菜单内点击不切换
            if (state.clickTimer) { clearTimeout(state.clickTimer); state.clickTimer = null; return; }  // 双击的第二次点击 → 交给 dblclick
            state.clickTimer = setTimeout(function () {
              state.clickTimer = null;
              if (!state.anims || !state.anims.length || !state.player) return;
              state.animIdx = (state.animIdx + 1) % state.anims.length;
              var nm = state.anims[state.animIdx];
              try {
                state.player.setAnimation(nm, true);
                state.player.play && state.player.play();
                showAnimName(nm);
              } catch (e) {
                showAnimName('切换失败: ' + (e && e.message));
              }
            }, 260);
          };
          state.container.ondblclick = function (ev) {
            if (ev.target.closest && ev.target.closest('.bd2-menu')) return;
            if (state.clickTimer) { clearTimeout(state.clickTimer); state.clickTimer = null; }
            toggleZoom();
          };
          // 悬停显示动作/角色菜单
          state.container.onmouseenter = showMenus;
          state.container.onmouseleave = scheduleHide;
        } else if (++tries % 20 === 0) {
          setStatus('下载角色资源…（' + Math.round(tries / 10) + 's）');
        }
      } catch (e) {}
    }, 100);
    state.player = p;
  }

  function mount() {
    // 浮动面板：直接挂 body（fixed 定位），不再压缩会话空间
    var container = document.createElement('div');
    container.id = 'bd2-live';
    document.body.appendChild(container);

    var obs = new ResizeObserver(function () {
      if (state.loaded && state.player) applyViewport(state.player);
    });
    obs.observe(container);

    state.container = container; state.obs = obs;
    var cidx = pickIndex();
    state.char = (CHARS[cidx] || CHARS[0] || null);
    setStatus('加载渲染库…');
    loadSpineLib()
      .then(function () {
        if (!state.char) { showMsg('角色数据缺失，请刷新页面'); return; }
        try { renderChar(state.char); }
        catch (e) { showMsg('渲染出错: ' + errDetail(e)); }
      })
      .catch(function (e) { showMsg('渲染库加载失败: ' + errDetail(e)); });
    return true;
  }

  function ensureMounted() {
    if (state.container && document.getElementById('bd2-live')) return;
    if (state.obs) { try { state.obs.disconnect(); } catch (e) {} }
    state = { container: null, player: null, char: null, obs: null, loaded: false, cam: null, bounds: null, anims: null, animIdx: 0, zoomed: false, clickTimer: null };
    mount();
  }

  function scheduleNext() {
    var now = new Date();
    var next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1);
    setTimeout(function () {
      ensureMounted();
      var c = CHARS[pickIndex()];
      if (state.container && state.char && c[0] !== state.char[0]) {
        state.char = c;
        if (window.spine && window.spine.SpinePlayer) renderChar(c);
        else loadSpineLib().then(function () { renderChar(c); });
      }
      scheduleNext();
    }, next - now);
  }

  function boot() {
    var s = document.createElement('style');
    s.textContent = STYLE;
    document.head.appendChild(s);
    // 注册 Service Worker：角色资源本地缓存（首次加载后切换/刷新不再走网络）
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(function (e) {
        console.warn('[bd2] SW 注册失败', e);
      });
    }
    // 窗口变化时若处于放大状态，重新收敛到输入框上边缘以内（面板比例跟随角色）
    window.addEventListener('resize', function () {
      if (state.zoomed && state.container) {
        var limit = getComposerTop();
        var ba = charAspect();
        var h = Math.max(220, limit - 14 - 10);
        var w = Math.round(h / ba);
        w = Math.min(Math.max(280, w), 640);
        if (w === 640 && h / ba > 640) h = Math.round(640 * ba);
        state.container.style.height = h + 'px';
        state.container.style.width = w + 'px';
        if (state.loaded && state.player) setTimeout(function () { applyViewport(state.player); }, 60);
      }
    });
    ensureMounted();
    if (!state.container) {
      new MutationObserver(function () { ensureMounted(); }).observe(document.body, { childList: true, subtree: true });
    } else {
      new MutationObserver(function () { ensureMounted(); }).observe(document.body, { childList: true, subtree: true });
    }
    scheduleNext();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
