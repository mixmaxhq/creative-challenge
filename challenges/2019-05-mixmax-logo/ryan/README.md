# Mixmax Logo JavaScript Faux-Quine

This entry in the Mixmax Creative Code Challenge May 2019 competition is a false
quine written in JavaScript. (A quine isn't supposed to read its own source code
but this one does; also the output can't be run as-is due to line breaks in the
wrong places.)

## The Code

The canonical source is located in [index.js](./index.js), and is reproduced here
for easy access:

```
!function e(t){t.j=t.createElement;const n="appendChild",o=new Image;o.crossOrigin="Anonymous",o.src=
"https://github.com/mixmaxhq/creative-challenge/blob/master/assets/2019-05-mixmax-logo/mixmax.png?raw=true"
,o.onload=(a=>{t.body.innerHTML="",[].slice.call(t.getElementsByTagName("style")).forEach(e=>e.remove()),t.
querySelectorAll          ("link[rel          =stylesheet          ]").forEach(e=>e.remove());const r=
'('+e.toString()          .replace(           /\s+|\n/g,           '')+'})(document);',s=t.j("style");s.
innerHTML="body{          background          :#ddd}div{           margin:0 auto;position:absolute;left\
: 50%; top: 50%;          transform:         translateX(          -50%) translateY(-50%)}span{font:bold \
12pt monospace;           display:            block}i{             font-style:normal}",/* Ryan */t.body[n]
(s);const i=t.j(          "canvas"            );const              q="width",z="height";[q,z].forEach(
e=>i[e]=o[e]),t.          body[n              ](i);                const l=t.j("div");/* Freebern */t.body[n]
(l);const c=t.j(          "span"              );c.                 innerText="M",l[n](c);c.e=c.getBoundingClientRect
;const d=c.e()[z          ]/        c.        e(        )[         q];c.remove();const g=i.getContext("2d"
);g.drawImage(o,                   0,0                  );         const h=Math,m=h.ceil(i[q]*i[z]
/r.length),b=h.                  sqrt(                m/d)         ,u=m/b,y=g.getImageData(0,0,i[q]
,i[z]),f=(e,t)=>                 {e=h.               round         (e);const/* ryan@ */ n=(t=h.round(t))
*(4*y[q])+4*e,[o               ,a,r,s]             =y.data         .slice(n,n+4);/* mixmax.com */return 0!==
s&&`rgb(${o},${a             },${r})`}           ;let p,w,         x,v,j,E=0;for(w=0;w<i[z]-1;
w+=u){for(x=t.j(           "span"),p=0         ;p<i[q]-1;p         +=b)j=t.j("i"),(v=f(p,w))?j.style.
background="#fff":v="#bbb",j.style.color=v,j.innerText=r[E++]||"",x[n](j);l[n](x)}i.remove()})}(document);
```

## Running the Code

To run, open your console on this page and paste the code in, then hit enter.

## Bonus

Pull down the repo and run `git log --oneline --author=Freebern 03452e2...e2f509a` for an easter egg. 
