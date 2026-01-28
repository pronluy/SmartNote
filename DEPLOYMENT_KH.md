# 🚀 រៀបចំនិងដំឡើងទៅ Vercel

## ជំហានទី ១៖ បង្កើត Vercel Account

1. ទៅ [vercel.com](https://vercel.com)
2. ចុច "Sign Up" (ឥតគិតថ្លៃ)
3. ប្រើ GitHub, GitLab, ឬ Bitbucket account

## ជំហានទី ២៖ Upload Project

### វិធី A: ប្រើ Vercel Dashboard (ងាយស្រួល)

1. ចុច "Add New" → "Project"
2. ចុច "Browse" ហើយជ្រើសរើស folder `lesson-notes-fullstack`
3. Vercel នឹងស្វ័យប្រវត្តិ detect Next.js
4. ចុច "Deploy"

### វិធី B: ប្រើ GitHub

1. Upload code ទៅ GitHub repository របស់អ្នក
2. នៅក្នុង Vercel, ចុច "Import Git Repository"
3. ជ្រើសរើស repository
4. ចុច "Deploy"

## ជំហានទី ៣៖ បន្ថែម Database

1. ចុចលើ project ដែល deploy ហើយ
2. ទៅកាន់ "Storage" tab
3. ចុច "Create Database"
4. ជ្រើសរើស "Postgres"
5. ចុច "Create"

✅ Vercel នឹង setup database variables ស្វ័យប្រវត្តិ!

## ជំហានទី ៤៖ កំណត់ Environment Variables

1. ទៅកាន់ "Settings" → "Environment Variables"
2. បន្ថែម:

```
JWT_SECRET=paste-any-long-random-text-here
```

ឧទាហរណ៍ JWT_SECRET:
```
JWT_SECRET=my-super-secret-key-12345-change-this-to-random-text
```

## ជំហានទី ៥៖ Initialize Database

1. រង់ចាំ deployment ចប់ (1-2 នាទី)
2. ចុចលើ "Visit" ដើម្បីបើក website
3. នៅក្នុង URL, បន្ថែម `/api/init-db` នៅខាងចុង
   - ឧទាហរណ៍: `https://your-app.vercel.app/api/init-db`
4. បើឃើញ "Database initialized successfully!" = ជោគជ័យ! ✅

## ជំហានទី ៦៖ ចាប់ផ្តើមប្រើប្រាស់

1. ទៅកាន់ homepage
2. ចុច "Register" ដើម្បីបង្កើត account
3. Login
4. ចាប់ផ្តើមសរសេរ notes!

## 🎯 URL របស់អ្នក

Vercel នឹងផ្តល់ឱ្យអ្នកនូវ free URL:
```
https://your-project-name.vercel.app
```

## 🔧 ប្រសិនបើមានបញ្ហា

### Database Error
- ត្រួតពិនិត្យថា Postgres storage ត្រូវបានបន្ថែមហើយ
- ទៅ `/api/init-db` ម្តងទៀត

### Login មិនដំណើរការ
- ត្រួតពិនិត្យ JWT_SECRET នៅក្នុង Environment Variables
- Redeploy project

### Deploy Failed
- មើល logs នៅក្នុង Vercel dashboard
- ត្រួតពិនិត្យ package.json

## 💡 Tips

- Deployment គឺ FREE នៅលើ Vercel
- Database FREE tier: 256MB storage
- Auto SSL certificate (HTTPS)
- Automatic deployments នៅពេល push code

---

## 🌟 រៀបរយចប់!

ឥឡូវនេះអ្នកមាន:
- ✅ Website live នៅលើ internet
- ✅ User authentication
- ✅ Cloud database storage
- ✅ HTTPS secure
- ✅ ឥតគិតថ្លៃ!

ប្រើប្រាស់ដោយសេរី និងចែករំលែកជាមួយមិត្តភក្តិ! 🎉
