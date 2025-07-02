
document.addEventListener("DOMContentLoaded", () => {
  const report = document.getElementById("final-report");
  const content = document.createElement("div");
  content.id = "final-report-content";
  report.appendChild(content);

  const lines = [
    {
      html: `<em style="color: #202e70;">초세계급 ${currentUser.class} 님이 조사를 완료하였습니다…</em>`,
      align: 'left',
      lineStyle: 'color: #202e70; font-style: italic;'
    },
    {
      html: `<strong style="color: #202e70;">조사 결과 요약:</strong>`,
      align: 'left',
      lineStyle: 'color: #202e70; font-weight: bold;'
    },
    ...(currentUser.post ? [{
      html: `「${currentUser.post}」 압화된 엽서를 손에 넣었다.`,
      align: 'right',
      lineStyle: 'color: black; font-style: italic;'
    }] : [])
  ];

  lines.forEach(({ html, align, lineStyle }, idx) => {
    const line = document.createElement('div');
    line.className = 'typed-line slide-in';
    line.style = `text-align: ${align}; ${lineStyle}; animation-delay: ${idx * 0.15}s`;
    line.innerHTML = html;
    content.appendChild(line);
  });
});

// CSS 애니메이션 정의
const style = document.createElement("style");
style.innerHTML = `
  #final-report-content {
    margin-top: 2em;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 1em;
  }

  .slide-in {
    opacity: 0;
    transform: translateX(-30px);
    animation: slideIn 0.5s ease-out forwards;
  }

  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .final-cursor {
    display: inline-block;
    width: 10px;
    color: #202e70;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;
document.head.appendChild(style);
