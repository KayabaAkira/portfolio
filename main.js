document.addEventListener('DOMContentLoaded', () => {
  // --- 1. タイピングアニメーション（一文字ずつ表示） ---
  const typewriterElements = document.querySelectorAll('.typewriter');

  typewriterElements.forEach((el) => {
    // 要素内のテキストを取り出して1文字ずつ <span> で囲む
    const nodes = Array.from(el.childNodes);
    el.innerHTML = '';

    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        // 1文字ずつ分割
        text.split('').forEach((char) => {
          const span = document.createElement('span');
          // 空白文字の崩れ防止
          span.innerHTML = char === ' ' ? '&nbsp;' : char;
          el.appendChild(span);
        });
      } else {
        // <br> などのタグはそのまま残す
        el.appendChild(node.cloneNode(true));
      }
    });
  });

  // ページ読み込み後、タイピングを開始
  setTimeout(() => {
    typewriterElements.forEach((el) => {
      const spans = el.querySelectorAll('span');
      // 要素ごとの開始ディレイ（delay-1なら0.5秒後、delay-2なら1.0秒後など）
      let startDelay = 500;
      if (el.classList.contains('delay-1')) startDelay = 400;
      if (el.classList.contains('delay-2')) startDelay = 900;
      if (el.classList.contains('delay-3')) startDelay = 2200;

      spans.forEach((span, index) => {
        // 1文字あたり 40ミリ秒 間隔で順に出現
        setTimeout(() => {
          span.classList.add('is-typed');
        }, startDelay + index * 40);
      });
    });

    // ボタンやSCROLLガイドなど（通常のフェードイン要素）の表示
    const fadeItems = document.querySelectorAll('.fade-item');
    fadeItems.forEach((item) => {
      item.classList.add('is-visible');
    });
  }, 100);
});