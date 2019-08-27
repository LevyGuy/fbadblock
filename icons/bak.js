
const canvas = document.createElement('canvas');
canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    background: #fff;

    width: 500px;
    height: 614px; 
`;
canvas.id = '__fbab';
document.body.appendChild(canvas);


const ctx = canvas.getContext("2d");
const data = `
<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
  <foreignObject width='100%' height='100%'>
  
  </foreignObject>
</svg>
`;
setTimeout(function(){
    console.log('in set timeout');
    
    const img = new Image();
    const svg = new Blob([data], {type: "image/svg+xml;charset=utf-8"});
    const url = URL.createObjectURL(svg);
    console.log('url', url);
    
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
      console.log('image loaded....');
      
      console.log(url);
      console.log(img);
      
    //   URL.revokeObjectURL(url);
    };
    img.src = url;
}, 2000);


