(M=n=>{m=n-1
	k=2*m
	b='|'.repeat(n)
	for(i=0;i<k+1;i++){g=b;for(j in b)g+=(i<m?j<m-i:j>k-i)?' ':'/';console.log(g+g+b)}})(7)