import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Author } from "@/components/author"

export default function PostPage({ params }: { params: { slug: string } }) {
  // In a real application, you would fetch this data from a database or CMS
  const posts = [
    {
      slug: "understanding-functional-programming",
      title: "Understanding Functional Programming",
      date: "March 10, 2025",
      content: `
        Functional programming is a paradigm that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data.

        ## Core Principles

        1. **Pure Functions**: Functions that given the same input, always return the same output without side effects.
        2. **Immutability**: Data cannot be changed after it's created.
        3. **First-Class Functions**: Functions can be assigned to variables, passed as arguments, and returned from other functions.
        4. **Higher-Order Functions**: Functions that take other functions as arguments or return them.

        ## Benefits

        - **Predictability**: Pure functions make code more predictable and easier to test.
        - **Concurrency**: Immutable data and lack of side effects make concurrent programming safer.
        - **Modularity**: Functional code tends to be more modular and composable.

        ## Examples in JavaScript

        \`\`\`javascript
        // Pure function
        const add = (a, b) => a + b;

        // Higher-order function
        const map = (fn, arr) => arr.map(fn);

        // Function composition
        const compose = (f, g) => x => f(g(x));
        \`\`\`

        Adopting functional programming principles can significantly improve code quality, even in languages that aren't purely functional.
      `,
    },
    {
      slug: "evolution-of-javascript",
      title: "The Evolution of JavaScript",
      date: "February 28, 2025",
      content: `
        JavaScript has come a long way since its creation in 1995 by Brendan Eich. Originally designed as a simple scripting language for Netscape Navigator, it has evolved into one of the most widely used programming languages in the world.

        ## The Early Days

        JavaScript was created in just 10 days and was initially called Mocha, then LiveScript, before being renamed JavaScript as a marketing move to capitalize on the popularity of Java.

        ## The Standardization Era

        In 1997, JavaScript was standardized as ECMAScript. This began a period of slow but steady improvements to the language.

        ## The Stagnation

        Between 1999 (ES3) and 2009, JavaScript development stagnated. The ambitious ES4 specification was abandoned.

        ## The Renaissance

        ES5 was released in 2009, bringing important features like strict mode, JSON methods, and array iteration methods.

        ## The Modern Era

        ES6/ES2015 was a landmark release that transformed JavaScript with features like:

        - Arrow functions
        - Classes
        - Modules
        - Promises
        - Template literals
        - Destructuring

        Since then, JavaScript has received yearly updates, continuously improving the language.

        ## The Future

        JavaScript continues to evolve with proposals for features like:

        - Pattern matching
        - Pipeline operator
        - Decorators
        - Records and tuples

        The language that was once dismissed as a "toy" has become the backbone of modern web development.
      `,
    },
    {
      slug: "building-resilient-systems",
      title: "Building Resilient Systems",
      date: "February 15, 2025",
      content: `
        Resilience is the ability of a system to handle failures gracefully and continue operating effectively. In today's complex distributed systems, resilience is not optional—it's essential.

        ## Key Principles

        1. **Expect Failures**: Design with the assumption that components will fail.
        2. **Redundancy**: Eliminate single points of failure through redundancy.
        3. **Isolation**: Contain failures to prevent cascading effects.
        4. **Monitoring**: Detect failures quickly through comprehensive monitoring.
        5. **Graceful Degradation**: Maintain core functionality even when some components fail.

        ## Techniques

        ### Circuit Breakers

        Prevent system overload by temporarily disabling failing components:

        \`\`\`javascript
        class CircuitBreaker {
          constructor(fn, options = {}) {
            this.fn = fn;
            this.failureThreshold = options.failureThreshold || 5;
            this.resetTimeout = options.resetTimeout || 30000;
            this.state = 'CLOSED';
            this.failures = 0;
          }

          async fire(...args) {
            if (this.state === 'OPEN') {
              return this.fallback(...args);
            }

            try {
              const result = await this.fn(...args);
              this.reset();
              return result;
            } catch (error) {
              this.failures++;
              if (this.failures >= this.failureThreshold) {
                this.trip();
              }
              throw error;
            }
          }

          fallback(...args) {
            // Implement fallback behavior
          }

          reset() {
            this.failures = 0;
            this.state = 'CLOSED';
          }

          trip() {
            this.state = 'OPEN';
            setTimeout(() => {
              this.state = 'HALF-OPEN';
            }, this.resetTimeout);
          }
        }
        \`\`\`

        ### Bulkheads

        Isolate components to contain failures, like compartments in a ship.

        ### Timeouts

        Prevent indefinite waiting by setting appropriate timeouts.

        ### Retries with Exponential Backoff

        Automatically retry failed operations with increasing delays.

        ## Conclusion

        Building resilient systems requires a mindset shift from preventing failures to embracing them as inevitable. By designing systems that expect and handle failures gracefully, we can create more reliable software that delivers value even under adverse conditions.
      `,
    },
    {
      slug: "art-of-clean-code",
      title: "The Art of Clean Code",
      date: "January 30, 2025",
      content: `
        Clean code is not just about making code work—it's about making code that is readable, maintainable, and elegant. It's about writing code that others (including your future self) can understand and modify with ease.

        ## Principles of Clean Code

        ### 1. Clarity

        Code should be written to minimize the time it takes for someone else to understand it:

        \`\`\`javascript
        // Bad
        function x(a, b) {
          return a.filter(i => b.includes(i));
        }

        // Good
        function findCommonElements(firstArray, secondArray) {
          return firstArray.filter(element => secondArray.includes(element));
        }
        \`\`\`

        ### 2. Simplicity

        Keep code as simple as possible, but no simpler:

        \`\`\`javascript
        // Overly complex
        function isEven(num) {
          return num % 2 === 0 ? true : false;
        }

        // Simpler
        function isEven(num) {
          return num % 2 === 0;
        }
        \`\`\`

        ### 3. DRY (Don't Repeat Yourself)

        Avoid duplication by abstracting common functionality:

        \`\`\`javascript
        // Repetitive
        function validateEmail(email) {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(email);
        }

        function validatePhone(phone) {
          const regex = /^\d{10}$/;
          return regex.test(phone);
        }

        // DRY
        function validate(value, regex) {
          return regex.test(value);
        }

        const validateEmail = (email) => validate(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        const validatePhone = (phone) => validate(phone, /^\d{10}$/);
        \`\`\`

        ### 4. Single Responsibility

        Each function or class should have one reason to change:

        \`\`\`javascript
        // Multiple responsibilities
        function processUser(user) {
          // Validate user
          if (!user.email || !user.name) {
            throw new Error('Invalid user');
          }
          
          // Save user to database
          database.save(user);
          
          // Send welcome email
          emailService.send(user.email, 'Welcome!', 'Welcome to our service');
        }

        // Single responsibility
        function validateUser(user) {
          if (!user.email || !user.name) {
            throw new Error('Invalid user');
          }
          return user;
        }

        function saveUser(user) {
          return database.save(user);
        }

        function sendWelcomeEmail(user) {
          return emailService.send(user.email, 'Welcome!', 'Welcome to our service');
        }

        function processUser(user) {
          const validUser = validateUser(user);
          saveUser(validUser);
          sendWelcomeEmail(validUser);
        }
        \`\`\`

        ## Practices for Clean Code

        1. **Meaningful Names**: Use descriptive names for variables, functions, and classes.
        2. **Small Functions**: Keep functions focused and short.
        3. **Consistent Formatting**: Follow a consistent style guide.
        4. **Good Comments**: Explain why, not what.
        5. **Error Handling**: Handle errors gracefully and informatively.
        6. **Unit Tests**: Write tests that document and verify behavior.

        ## Conclusion

        Clean code is an art that requires practice and discipline. It's about communication with other developers through the medium of code. By following these principles and practices, we can create code that is not just functional, but also a joy to work with.
      `,
    },
  ]

  const post = posts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12 font-mono">
      <div className="flex justify-between items-center mb-8">
        <Link href="/" className="inline-flex items-center text-sm uppercase tracking-wider hover:underline">
          <ArrowLeft className="mr-1 h-3 w-3" /> BACK TO POSTS
        </Link>
        <ThemeToggle />
      </div>

      <article>
        <header className="mb-8 border-b-2 border-black dark:border-white pb-4">
          <div className="text-xs uppercase tracking-widest mb-2">{post.date}</div>
          <h1 className="text-3xl font-bold">{post.title}</h1>
        </header>

        <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:border prose-pre:border-black dark:prose-pre:border-white">
          {post.content.split("\n\n").map((paragraph, index) => {
            // Handle markdown headings
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={index} className="text-xl font-bold mt-8 mb-4">
                  {paragraph.replace("## ", "")}
                </h2>
              )
            }

            // Handle code blocks
            if (paragraph.startsWith("```")) {
              const code = paragraph.split("```")[1].split("\n").slice(1).join("\n")
              return (
                <pre key={index} className="p-4 my-4 overflow-x-auto">
                  <code>{code}</code>
                </pre>
              )
            }

            // Regular paragraphs
            return (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            )
          })}
        </div>

        <footer className="mt-12 pt-8 border-t-2 border-black dark:border-white">
          <h3 className="text-lg font-bold mb-4 uppercase">About the Author</h3>
          <Author />
        </footer>
      </article>
    </main>
  )
}

