# Scale Timer

Scale Timer is a web app that helps users practice their guitar scales. Currently there are 7 major scale modes and 5 pentatonic scale modes to practice. 

Once the user selects a scale to practice they and presses start the app will display a random note which is the starting note of the scale. There is also an optional metronome the user can use. The user should then go through two octaves of the scale and go back down to the root note. Once the user completes this they select next and another random note appear and they will repeat the drill.

Once the user goes through all 12 notes the they can submit their time to be saved to the database. All these times are logged and progress can be viewed on the analytics page. The analytics page lets filter on which scale and displays data graphically.

## Stack
The frontend is made with Next.js and Tailwind CSS, the backend with Python and FastAPI, and a PostgreSQL database. 

## Future Ideas/Goals
* Add fretboard memorization game/drill
* Add chord practice/recognization drills
* Add chromatic scale