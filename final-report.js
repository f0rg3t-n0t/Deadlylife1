function loadFinalReport() {
  document.body.innerHTML = '';

  const div = document.createElement('div');
  div.id = 'final-report';
  div.className = 'fade-in';
  div.style = `
    max-width: 700px;
    margin: 100px auto;
    background: white;
    border: 3px solid #3f40d3;
    border-radius: 10px;
    color: black;
    padding: 2em;
    font-family: 'Noto Sans KR', sans-serif;
    position: relative;
  `;

  const lines = [
    { html: `<em style="color: #3f40d3;">초세계급 ${currentUser.class} 님이 조사를 완료하였습니다…</em>`, align: 'left', lineStyle: 'color: #3f40d3; font-style: italic;' },
    { html: `<em style="color: #3f40d3;">조사 결과 저장 중…</em>`, align: 'left', lineStyle: 'color: #3f40d3; font-style: italic;' },
    { html: `<span style="color: black;">User ID : ${currentUser.id} | STR ${currentUser.STR}  INT ${currentUser.INT}  OBS ${currentUser.OBS}  POW ${currentUser.POW}  LUC ${currentUser.LUC}</span>`, align: 'left', lineStyle: 'color: black;' },
    { html: `<span style="color: black;">Coin : ${currentUser.coin}</span>`, align: 'left', lineStyle: 'color: black;' }
  ];

  if (currentUser.key === 1) {
    lines.push({ html: `<div style="color: black; font-style: italic;">손끝에 미세하게 꽃향기가 남아 있다 …</div>`, align: 'right', lineStyle: 'color: black; font-style: italic;' });
  }
  if (currentUser.unicycle === true) {
    lines.push({ html: `<div style="color: black; font-style: italic;">외바퀴자전거 타는 법을 마스터했다 …</div>`, align: 'right', lineStyle: 'color: black; font-style: italic;' });
  }
  if (currentUser.wishticket === true) {
    lines.push({ html: `<div style="color: black; font-style: italic;">‘소원권’ 을 획득했다. 선물할 시 상대의 호감도에 +2 …</div>`, align: 'right', lineStyle: 'color: black; font-style: italic;' });
  }
  if (currentUser.notalove === true) {
    lines.push({ html: `<div style="color: black; font-style: italic;">공증인의 호의를 얻은 것 같다 …</div>`, align: 'right', lineStyle: 'color: black; font-style: italic;' });
  }
  if (currentUser.post) {
  lines.push({
    html: `<div style="color: black; font-style: italic;">${currentUser.post} 압화된 엽서를 손에 넣었다 …</div>`,
    align: 'right',
    lineStyle: 'color: black; font-style: italic;'
  });
}
  if (currentUser.gongmo && currentUser.gongmo.length > 0) {
  lines.push({
    html: `<div style="color: black; font-style: italic;">"${currentUser.gongmo}"로 랜덤 음료 공모전에 참여했다 …</div>`,
    align: 'right',
    lineStyle: 'color: black; font-style: italic;'
  });
}
  lines.push({ html: `<div style="color: #888">본 페이지를 스크린샷하여 총괄계 DM으로 제출하면 조사 완료 처리됩니다.</div>`, align: 'right', lineStyle: 'color: #888;' });

  const content = document.createElement('div');
  div.appendChild(content);
  document.body.appendChild(div);

  function splitHangul(text) {
    return Array.from(text.normalize('NFD'));
  }

  let index = 0;
  function typeLine() {
    if (index >= lines.length) return;

    const { html: realText, align, lineStyle } = lines[index];
    const clean = realText.replace(/<[^>]+>/g, '');
    const units = splitHangul(clean);

    const container = document.createElement('div');
    container.style = `position: relative; margin-bottom: 1.5em; min-height: 1.5em; text-align: ${align};`;

    let ghost = null;
    let ghostSpan = null;
    let ghostFrame = 0;
    let ghostCleared = false;

    if (align !== 'right') {
      ghost = document.createElement('div');
      ghost.className = 'ghost-line';
      ghost.style = `text-align: ${align}; ${lineStyle}`;
      container.appendChild(ghost);

      ghostSpan = document.createElement('span');
      ghostSpan.className = 'ghost-fade';
      ghostSpan.style = `${lineStyle}`;
      ghostSpan.dataset.align = align;
      ghost.appendChild(ghostSpan);
    }

    const real = document.createElement('div');
    real.className = 'typed-line';
    real.style = `text-align: ${align}; ${lineStyle}`;
    container.appendChild(real);

    content.appendChild(container);

    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...';
    const loremUnits = splitHangul(lorem);

    const totalGhost = loremUnits.length;
    const totalReal = units.length;
    let realFrame = 0;
    let realStarted = false;

    function typeBoth() {
      // ghost 출력 (왼쪽 정렬일 때만)
      if (align !== 'right' && ghostFrame < totalGhost) {
        const fadeDistance = 6;
        const fadedUnits = loremUnits.slice(0, ghostFrame).map((char, idx, arr) => {
          const age = arr.length - idx;
          const opacity = Math.max(0, (fadeDistance - age) / fadeDistance);
          return `<span style="opacity: ${opacity.toFixed(2)}">${char}</span>`;
        }).join('');
        ghostSpan.innerHTML = `<span class="ghost-text">${fadedUnits}</span>`;
        ghostFrame++;
        setTimeout(typeBoth, 40);
      } else if (align !== 'right' && !ghostCleared) {
        ghostSpan.innerHTML = '';
        ghostCleared = true;
      }

      // real 출력은 ghost 시작과 무관하게 0.3초 후 시작
      if (!realStarted) {
        realStarted = true;
        setTimeout(() => {
          function typeReal() {
            if (realFrame <= totalReal) {
              real.innerHTML = `<span style="${lineStyle}">${units.slice(0, realFrame).join('')}</span><span class="final-cursor">▋</span>`;
              realFrame++;
              setTimeout(typeReal, 60);
            } else {
              real.innerHTML = realText;
              index++;
              setTimeout(typeLine, 600);
            }
          }
          typeReal();
        }, 200);
      }
    }

    typeBoth();
  }

  typeLine();
}

// 스타일 삽입
const style = document.createElement('style');
style.innerHTML = `
  .ghost-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    font-style: italic;
    font-size: 0.95em;
    white-space: pre-wrap;
    z-index: 0;
  }
  .ghost-fade {
    display: inline-block;
    color: rgba(150, 200, 255, 0.4);
  }
  .ghost-text span {
    transition: opacity 0.2s linear;
  }
  .typed-line {
    position: relative;
    z-index: 1;
    white-space: pre-wrap;
  }
  .final-cursor {
    color: #3f40d3;
    animation: blink-final 0.8s step-end infinite;
    font-weight: bold;
    margin-left: 2px;
  }
  @keyframes blink-final {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }
`;
document.head.appendChild(style);
