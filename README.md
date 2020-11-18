# Angula Rank Recruitment Task
Simple web application build with Next.js and serverless functions.

Checkout live app: [Angula Rank](https://angula-rank-recruitment-task.vercel.app/angular)

![App Screenshot](https://angula-rank-recruitment-task.vercel.app/github-screenshot.png)

## 🚀 Getting Started

### Setup
1. Make sure that you have Node.js v14.5.0 and yarn v1.9.4 or above installed.
2. Clone this repo using: `git clone https://github.com/IgorDyniewski/angula-rank-recruitment-task.git`
3. Move to the appropriate directory: `cd angula-rank-recruitment-task`
4. Run `yarn` 
   
### Setup environment variables
1. Create `.env.local` file and fill all necessary variables. You can use pre-made `example.env.local`:
   
   ```bash
    cp example.env.local .env.local
   ```

### Run the app
1. To start development server:
   
    ```bash
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

2. To start production server
   - `yarn build`, then `yarn start`