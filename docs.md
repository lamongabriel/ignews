## .env.local configuration

```bash

# STRIPE
$ STRIPE_API_KEY=yourkey
$ NEXT_PUBLIC_STRIPE_PUBLIC_KEY=yourkey
$ STRIPE_SUCCESS_URL=http://localhost:3000/posts
$ STRIPE_CANCEL_URL=http://localhost:3000/

# GITHUB AUTH
$ GITHUB_ID=idhere
$ GITHUB_SECRET=secrethere

# DATABASE ACCESS
$ FAUNADB_KEY=youkeyhere

# PRISMIC CMS
PRISMIC_ACCESS_TOKEN=tokenhere
```

## update sm.json
```bash
# You must set to your prismic API url.
  { "apiEndpoint": "https://lamongabriel-ignews.prismic.io/api/v2",
	...
	}

```
