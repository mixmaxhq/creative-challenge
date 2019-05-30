# JavaScript Code Golf: ASCII Mixmax Logo

My submission is a JavaScript function for printing an ASCII Mixmax logo of a given size using as few bytes of source code as possible: 

```js
M=n=>{m=n-1
	k=2*m
	b='|'.repeat(n)
	for(i=0;i<k+1;i++){g=b;for(j in b)g+=(i<m?j<m-i:j>k-i)?' ':'/';console.log(g+g+b)}}
```

It's ~~119~~ 117 characters long<sup>1</sup> and like most code golf submissions is nearly indecipherable. Let's see it in action:

```
$ node logo.js
|||||||      /|||||||      /|||||||
|||||||     //|||||||     //|||||||
|||||||    ///|||||||    ///|||||||
|||||||   ////|||||||   ////|||||||
|||||||  /////|||||||  /////|||||||
||||||| //////||||||| //////|||||||
|||||||///////|||||||///////|||||||
|||||||////// |||||||////// |||||||
|||||||/////  |||||||/////  |||||||
|||||||////   |||||||////   |||||||
|||||||///    |||||||///    |||||||
|||||||//     |||||||//     |||||||
|||||||/      |||||||/      |||||||
```

Cool! Want to try it out yourself? Paste it into your browser console and give it a whirl! (don't worry, it definitely won't steal your cookies or worm your computer or anything)! My favorites are `M(20)` and `[...Array(15).keys()].map(M)`<sup>2</sup>. 

## How does it work?
Let's break it down:
```js
M=n=>{  // n is the number of |'s in the vertical bars.
	m=n-1 // First, let's define some constants for reuse later
	k=2*m // k is the height of the logo
	b='|'.repeat(n) // This forms the meat of the vertical bars of the M.
	                // I thought it was worth it to pay for all the characters in .repeat since we can get some
	                // good mileage out of it later, and I couldn't find a better way of repeating a character.
	for(i=0;i<k+1;i++){ // Loop over the rows of the M, printing a line for each row. Turns out a simple for loop 
                        // is the best tool for the job here.
		g=b; // g is the vertical | bar and the set of /'s to its right. Start with just the |'s, we'll add the 
		     // /'s later
		for(j in b) // Sneaky way of reusing the string 'b' to get a list of numbers going from 1 to n
			g+=( // Append either a / or a space to g, depending on where we are in the logo.
				i<m? // Are we in the upper half?
				j<m-i: // If so, add a space if we're before the top of the diagonal, else add a '/'
				j>k-i  // Else, add a space if we're after the bottom of the diagonal, else add a '/'
			)?' ':'/';
		console.log(g+g+b) // Print the line. The two g's are the first two bar-diagonal pairs, and the b is
						   // the last bar.
	}
}
```

See? Didn't I tell you it didn't do anything nefarious? And here you were all worried about running indecipherable code that you found on the Internet.

### Footnotes

1. Excluding whitespace.
2. Noteworthy is that `M(2)` looks more mature and fleshed out than `M(1)`; one might go so far as to say that it is 'better designed', and has 'fewer Chrome iframe bugs'.

