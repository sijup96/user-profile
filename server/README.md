NPM 
npm init -y
npm install express typescript @types/express ts-node --save

tsconfig.json
{
  "compilerOptions": {
    "target": "es2016", 
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}