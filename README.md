# Purple Rain Net Neutrality
##Requirements:

- The application must store at least 25 sources
- Dates and views or hits should be recorded beneath source
- The dissertation needs to pull data/text from at least 15 sources of the stored sources
- Future users should have the ability to change text, pulling from the stored 25+ sources
- The application should have the ability to update if a more popular or newer work is published or posted
to the internet about Net Neutrality
- In­depth text analysis
- Do not copy and paste text into the webpage
- For web purposes, add hover and click effects when possible

##Write-up:
**1. Does your project work, if not what were the issues you came up against?**
It runs, but not to the extent described in the spec. We have a web page that can make a request to our crawler, which queries for pdf's about net neutrality, then returns a json to the web page that displays the data.
 
**2. How did you build the project?**
We used python flask for the frontend because it was easy to set up and run. We used Node.js for the backend because it was suggested that the project be done in javascript.

**3. What was your process when building?**
Since we had little knowledge on the tasks required, we started off with lots of googling. We googled for information about web scrapers, dissertations, and pdf manipulation. Then Mike started working on the crawler, while Jessica put together a front end. The crawler took more work, so both of us pair-programmed to develop that section. 

**4. 1 minute on the function of your project, the rest of time explaining your code**
**5. Each team member should speak on their role**
Jessica: python frontend, helped with crawler
Mike: Node backend (crawler)

**6. What were some problems that your group faced (technical & esoteric)**
- The project specifications were very vague so we had to do much guesswork
- We had no idea how to build a web scraper
- We had no idea how to generate a well written dissertation
- Poor documentation for the libraries we used, such as pdf to json
