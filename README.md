## About this project

This is designed and implemented as a travel-style blog, which can be totally free to host. You can see a demo of this site at https://recursivetrails.com

## Features

- Sanity.io CMS
- Mailchimp for email signup
- Supabase database
- Post commenting (OAuth)
- Utilises Instagram API to display gallery images.
- Email contact link variations.
- Google Analytics

## Colaboration

If you're interested in colaborating on this project (whether you feel the code could be improved or would like to add a new feature), that would be great. Some features that I'd be interested in adding / refining:

- an e-commerce section for merch - probably using Sanity for this.
- a summary block on each post that indicates the number of comments.
- adding likes to post comments.
- adding advertisement (google adsense) functionality.

## Get started

You can build the project locally by doing the following:

1. Once cloned run `npm install` or whatever your preferred package manager is.
2. Complete the `.env.local` environment file by adding your info for:

   - sanity
   - supabase
   - mailchimp
   - google analytics (i.e., NEXT_PUBLIC_MEASURMENT_ID)
   - instagram api key
     If you have any trouble with any of the above - you should be able to google instructions on what is required. If you think this section needs more detailed instructions please let me know.

3. Once you've done the above you should be able to run `npm run dev` and you're good to go locally.
4. If you're wanting to deploy, I recommend doing so with Vercel, which is super easy. Just head to: https://vercel.com, signup and deploy and it will guide you through what you need to do.

## Licensing

This site is free to use in any way you see fit. If you find the site useful for learning or as a basis for your own, please considering starring this project.

## Enjoy!
