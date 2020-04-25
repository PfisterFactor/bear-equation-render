# bear-equation-render
A little Electron app I hacked together to display ASCIIMath equations in the Bear notetaking app

I found this app (Bear) when looking for a good note-taking app for school. I'm super impressed by it, and use it for most of my classes. A big thing however was taking notes for any math class was super annoying, I was using Bear's code blocks originally for equations.

So I developed this electron app (built for MacOS) that renders a math equation into bear using its x-callback api.

Its very simple, and uses ASCIIMath formatting, which is good enough for most of (my) uses. Just type in the equation (according to the MathASCII format) and it'll render in real time and show you the output. When your finished with your equation, fill in the note's unique ID (right click the note in Bear's menu and click "Copy Note's Identifier" and paste it in the box), press "Export to Bear" and it'll append an image of the equation to the bottom of the note. You can then drag it wherever you want in the note.

<s>I don't know if I'll add LaTeX support yet.</s> Implemented, thank you @MattBurn!

# Known Bugs / Limitations

- There is an issue with the Node.js mathjax backend that crashes the rendering engine when "(sqrt)" is typed (or variations thereof). Hopefully they'll release a fix, so I don't have to do a hacky workaround. Just restart the program if this occurs.
