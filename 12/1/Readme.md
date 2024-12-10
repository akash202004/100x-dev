### How to Deploy Frontend on AWS

- New concepts we will learn:
  - **S3 (Simple Storage Service):** An object storage service for storing and retrieving any amount of data.
  - **CloudFront (CDN):** A content delivery network to deliver your content with low latency.

### Build Your Frontend App

- **Note:** This approach will not work for Next.js as it uses Server-Side Rendering (SSR).

1. **Navigate to your project directory.**
2. **Build your project using the following command:**

   ```nginx
   npm run build
   ```

3. **Serve the HTML/CSS/JS locally to test:**

   Install the `serve` package globally:

   ```nginx
   npm i -g serve
   ```

   Serve your project:

   ```nginx
   serve
   ```

   At this point, you have basic HTML/CSS/JS code that you can deploy on the internet. While you might be tempted to host this on an EC2 instance, using S3 and CloudFront is a more efficient approach.

### What are CDNs ?

- A CDN stands for Content Delivery Network.
  As the name suggests, it’s an optimal way for you to deliver content (mp4 files, jpgs and even HTML/CSS/JS files) to your users.

- It is better than serving it from a VM/EC2 instances because of a few reasons -

1. **EC2 machine apprach**

   ![one](./one.webp)

2. **CDN approach**

   ![one](./two.webp)

- For fronted, mp4 files, images, `object store` + `CDNs` are a better approcach
- You can’t use the same for backends, since every request returns a different response. Caching doesn’t make any sense there.
