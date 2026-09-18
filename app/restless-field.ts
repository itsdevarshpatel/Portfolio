type FieldControl={focus:(index:number|null)=>void;freeze:(value:boolean)=>void;destroy:()=>void};
const colors=['#ff5a36','#c8ff3d','#8db8ff','#ffc2df','#ffcf55','#9d8cff','#72e6c5'];

/** Draws a cursor-reactive field without causing React renders on animation frames. */
export function createRestlessField(canvas:HTMLCanvasElement,onHover:(index:number|null)=>void):FieldControl{
 const context=canvas.getContext('2d')!;
 if(!context)throw new Error('Canvas unavailable');
 let width=1,height=1,dpr=1,frame=0,time=0,frozen=false,focus:number|null=null,hover:number|null=null;
 const pointer={x:.64,y:.48,tx:.64,ty:.48,inside:false};
 const dust=Array.from({length:110},(_,i)=>({angle:i*2.399,r:.12+(i%23)/25*.46,s:.15+(i%9)*.018,size:i%7===0?1.8:.7}));
 const nodes=[[.73,.24],[.78,.48],[.65,.73],[.47,.29],[.43,.66],[.88,.69],[.9,.35]];
 function resize(){dpr=Math.min(devicePixelRatio,1.7);width=canvas.clientWidth;height=canvas.clientHeight;canvas.width=width*dpr;canvas.height=height*dpr;context.setTransform(dpr,0,0,dpr,0,0)}
 const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
 const move=(event:PointerEvent)=>{const box=canvas.getBoundingClientRect();pointer.tx=(event.clientX-box.left)/box.width;pointer.ty=(event.clientY-box.top)/box.height;pointer.inside=true;let candidate:null|number=null,best=55;nodes.forEach((node,index)=>{const dx=node[0]*width-(event.clientX-box.left),dy=node[1]*height-(event.clientY-box.top),distance=Math.hypot(dx,dy);if(distance<best){best=distance;candidate=index}});if(candidate!==hover){hover=candidate;onHover(hover)}};
 const leave=()=>{pointer.inside=false;if(hover!==null){hover=null;onHover(null)}};canvas.addEventListener('pointermove',move,{passive:true});canvas.addEventListener('pointerleave',leave,{passive:true});
 function line(x1:number,y1:number,x2:number,y2:number,alpha=.18){context.beginPath();context.moveTo(x1,y1);context.lineTo(x2,y2);context.strokeStyle=`rgba(231,231,218,${alpha})`;context.stroke()}
 function draw(){frame=requestAnimationFrame(draw);if(!frozen)time+=.008;pointer.x+=(pointer.tx-pointer.x)*.045;pointer.y+=(pointer.ty-pointer.y)*.045;context.clearRect(0,0,width,height);const cx=width*(.67+(pointer.x-.5)*.018),cy=height*(.49+(pointer.y-.5)*.018),scale=Math.min(width,height);context.lineWidth=.7;
  for(let ring=0;ring<4;ring++){context.beginPath();const radius=scale*(.16+ring*.09);for(let step=0;step<=160;step++){const angle=step/160*Math.PI*2,wobble=Math.sin(angle*(3+ring)+time*(ring+1))*2.2,x=cx+Math.cos(angle+time*(ring%2?-.2:.12))*radius*(1.25+ring*.03)+wobble,y=cy+Math.sin(angle+time*(ring%2?-.2:.12))*radius*.72+wobble*.4;step?context.lineTo(x,y):context.moveTo(x,y)}context.strokeStyle=`rgba(231,231,218,${.11-ring*.015})`;context.stroke()}
  dust.forEach((dot,i)=>{const angle=dot.angle+time*dot.s,radius=dot.r*scale;let x=cx+Math.cos(angle)*radius*1.18,y=cy+Math.sin(angle)*radius*.72;if(pointer.inside){const px=pointer.x*width,py=pointer.y*height,dx=x-px,dy=y-py,distance=Math.max(35,Math.hypot(dx,dy)),force=Math.min(45,165000/(distance*distance));x+=dx/distance*force;y+=dy/distance*force}context.fillStyle=i%13===0?'#ff5a36':`rgba(225,226,213,${.18+(i%5)*.09})`;context.fillRect(x,y,dot.size,dot.size)});
  const active=focus??hover;nodes.forEach((node,index)=>{const x=node[0]*width,y=node[1]*height;line(cx,cy,x,y,active===index?.42:.11);context.beginPath();context.arc(x,y,active===index?8:3,0,Math.PI*2);context.fillStyle=active===index?colors[index]:'#dadccf';context.fill();if(active===index){context.beginPath();context.arc(x,y,19+Math.sin(time*5)*2,0,Math.PI*2);context.strokeStyle=colors[index];context.stroke()}});
  const gradient=context.createRadialGradient(cx,cy,0,cx,cy,scale*.12);gradient.addColorStop(0,'rgba(5,6,5,1)');gradient.addColorStop(.55,'rgba(5,6,5,.94)');gradient.addColorStop(1,'rgba(5,6,5,0)');context.fillStyle=gradient;context.beginPath();context.arc(cx,cy,scale*.12,0,Math.PI*2);context.fill();context.save();context.translate(cx,cy);context.rotate(time*.31);context.strokeStyle=active===null?'rgba(200,255,61,.6)':colors[active];context.lineWidth=1.3;context.beginPath();context.moveTo(scale*.055,0);context.lineTo(scale*.14,0);context.stroke();context.restore()}
 draw();return {focus(index){focus=index},freeze(value){frozen=value},destroy(){cancelAnimationFrame(frame);observer.disconnect();canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerleave',leave)}};
}
