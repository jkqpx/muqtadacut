MuqtadaCut — GitHub Pages deployment

The site files in this folder are the publication root. Create a GitHub
repository and upload these files directly to its main branch root.
In Settings > Pages, select Deploy from a branch: main / (root).
Set the custom domain to muqtadacut.com. The CNAME file is included.

At the active DNS provider, replace only the existing parking web records:
@ A 185.199.108.153
@ A 185.199.109.153
@ A 185.199.110.153
@ A 185.199.111.153
www CNAME <actual-github-username>.github.io

If Cloudflare DNS is active, set these web records to DNS only while GitHub
issues the certificate. Preserve all MX, SPF and other email records.
Do not add the DNS records before GitHub Pages owns the custom domain.
After the Pages certificate is ready, turn on Enforce HTTPS in Settings > Pages.
GitHub Pages redirects www to the apex when both variants are configured.

The site is HTML/CSS/JS with assets, so edits pushed to the same repository
are republished automatically. Most videos are embedded from the original
Google Drive links; the color comparison video is bundled locally.
