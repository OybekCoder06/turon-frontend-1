# TeacherAI Deployment Guide

## Overview

This guide covers deploying TeacherAI to various platforms including Vercel, Docker, and traditional VPS hosting.

## Prerequisites

Before deploying, ensure you have:

- GitHub repository with code pushed
- OpenAI API key (GPT-4 access)
- Google OAuth credentials (optional, for Google login)
- PostgreSQL database instance
- Domain name (for production)

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Advantages:**
- Zero-config deployment
- Automatic CI/CD
- Free tier available
- Global CDN
- Built-in analytics

**Steps:**

1. **Connect to Vercel:**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Set Environment Variables:**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all variables from `.env.example`:
     ```
     DATABASE_URL=postgresql://...
     NEXTAUTH_URL=https://yourdomain.com
     NEXTAUTH_SECRET=<generated-secret>
     GOOGLE_CLIENT_ID=...
     GOOGLE_CLIENT_SECRET=...
     OPENAI_API_KEY=...
     ```

3. **Database Setup:**
   - Use Vercel PostgreSQL OR
   - Use external provider (Railway, Supabase, AWS RDS)

   **For Vercel PostgreSQL:**
   ```bash
   vercel env pull .env.local
   ```

4. **Deploy:**
   ```bash
   vercel --prod
   ```

5. **Run Migrations:**
   ```bash
   # In Vercel dashboard or via:
   vercel exec -- npx prisma db push
   ```

### Option 2: Docker + Railway

**Advantages:**
- Easy container management
- PostgreSQL included
- Environment variables in UI
- Simple deployment process

**Steps:**

1. **Create Railway Account:**
   - Sign up at [railway.app](https://railway.app)
   - Create new project

2. **Add Databases:**
   - Add PostgreSQL plugin
   - Get DATABASE_URL from plugin

3. **Deploy:**
   ```bash
   npm install -g railway
   railway login
   railway link
   railway up
   ```

4. **Set Variables:**
   - Go to Variables tab
   - Add all required environment variables

### Option 3: Docker + Self-Hosted VPS

**Advantages:**
- Full control
- Cost-effective for large scale
- No third-party dependencies

**Requirements:**
- VPS with 2GB+ RAM
- Docker & Docker Compose installed
- Linux (Ubuntu 20.04+ recommended)

**Steps:**

1. **SSH into Server:**
   ```bash
   ssh root@your_ip
   ```

2. **Install Dependencies:**
   ```bash
   # Update system
   apt update && apt upgrade -y
   
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   
   # Install Docker Compose
   curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   chmod +x /usr/local/bin/docker-compose
   
   # Install Nginx (optional, for reverse proxy)
   apt install nginx -y
   ```

3. **Clone Repository:**
   ```bash
   git clone https://github.com/yourusername/teacherai.git
   cd teacherai/eng-teacher
   ```

4. **Create Environment File:**
   ```bash
   cp .env.example .env
   # Edit .env with production values
   nano .env
   ```

5. **Start Services:**
   ```bash
   docker-compose up -d
   ```

6. **Run Migrations:**
   ```bash
   docker-compose exec app npx prisma db push
   docker-compose exec app npx prisma db seed
   ```

7. **Setup Reverse Proxy (Optional):**
   ```bash
   # Create Nginx config
   sudo nano /etc/nginx/sites-available/teacherai
   ```

   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   # Enable site
   sudo ln -s /etc/nginx/sites-available/teacherai /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   
   # SSL with Let's Encrypt
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

### Option 4: AWS (ECS + RDS)

**Steps:**

1. **Create RDS PostgreSQL:**
   - AWS → RDS → Create Database
   - Choose PostgreSQL
   - Set up security groups

2. **Create ECS Cluster:**
   - AWS → ECS → Create Cluster
   - Create Task Definition from Dockerfile
   - Add environment variables

3. **Create Service:**
   - Set desired count: 1 (or more for HA)
   - Configure load balancer (optional)

4. **Database Migrations:**
   ```bash
   aws ecs execute-command --cluster teacherai-cluster \
     --task <task-id> \
     --container teacherai-app \
     --interactive \
     --command "npx prisma db push"
   ```

### Option 5: Heroku (Legacy - Not Recommended)

Heroku free tier has been discontinued, but if using paid Heroku:

```bash
heroku create teacherai
heroku addons:create heroku-postgresql:standard-0
heroku config:set NEXTAUTH_SECRET=$(openssl rand -base64 32)
git push heroku main
heroku run npx prisma db push
```

## Post-Deployment Checklist

- [ ] Environment variables are set correctly
- [ ] Database migrations have run successfully
- [ ] Seed data has been loaded (if needed)
- [ ] Application is accessible at domain
- [ ] HTTPS/SSL is configured
- [ ] Email notifications are working
- [ ] OpenAI API is responding
- [ ] Analytics are tracking correctly
- [ ] Backup strategy is in place
- [ ] Monitoring alerts are configured

## Database Backups

### Automated Backups

**Vercel PostgreSQL:**
- Automatic daily backups included
- 30-day retention
- Access from dashboard

**Self-Hosted:**
```bash
# Daily backup script (cron job)
#!/bin/bash
BACKUP_DIR="/backups/teacherai"
DB_NAME="teacherai"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

pg_dump $DATABASE_URL > "$BACKUP_DIR/backup_$TIMESTAMP.sql"

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

Add to crontab:
```bash
0 2 * * * /path/to/backup-script.sh
```

## Monitoring & Logging

### Vercel
- Dashboard shows deployment status
- Real-time function logs
- Edge Network metrics

### Self-Hosted with Docker
```bash
# View logs
docker-compose logs -f app

# View database logs
docker-compose logs -f postgres
```

### Monitoring Tools

**Recommended:**
- [Sentry](https://sentry.io) - Error tracking
- [Datadog](https://www.datadoghq.com/) - APM & Monitoring
- [Uptime Robot](https://uptimerobot.com/) - Uptime monitoring
- [New Relic](https://newrelic.com/) - Performance monitoring

## Performance Optimization

### Database
```sql
-- Add indexes for faster queries
CREATE INDEX idx_user_xp ON users(xp DESC);
CREATE INDEX idx_message_created ON messages(created_at DESC);
CREATE INDEX idx_conversation_user ON conversations(user_id);
```

### CDN
- Serve static assets from CDN
- Use image optimization
- Enable compression

### Caching
```typescript
// Add caching headers to API responses
res.setHeader('Cache-Control', 'public, max-age=60');
```

## Scaling

### Horizontal Scaling
- Add load balancer
- Multiple app instances
- Database replication

### Database Scaling
- Read replicas for queries
- Connection pooling (PgBouncer)
- Partitioning large tables

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Check connection limits
SELECT datname, numbackends FROM pg_stat_database;
```

### Memory Issues
```bash
# Increase Node.js heap
NODE_OPTIONS="--max-old-space-size=2048" npm run start
```

### Slow Queries
```bash
# Enable query logging
SET log_min_duration_statement = 1000;

# Analyze slow query
EXPLAIN ANALYZE SELECT ...;
```

## Rollback Strategy

### Vercel
```bash
# Rollback to previous deployment
vercel rollback
```

### Docker
```bash
# Tag release versions
docker tag teacherai:latest teacherai:v1.0.0
docker push teacherai:v1.0.0

# Rollback to previous version
docker-compose down
# Edit docker-compose.yml image tag
docker-compose up -d
```

## Security Checklist

- [ ] HTTPS/TLS enabled
- [ ] Environment variables secured
- [ ] Database password strong (20+ chars)
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] SQL injection protection active
- [ ] XSS protection headers set
- [ ] Regular security updates

## Maintenance Schedule

**Daily:**
- Monitor error logs
- Check uptime
- Verify backups completed

**Weekly:**
- Review performance metrics
- Update dependencies (security)
- Check disk usage

**Monthly:**
- Full security audit
- Performance review
- Cost analysis
- Capacity planning

**Quarterly:**
- Major version updates
- Database optimization
- Disaster recovery test

## Support & Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Docker Docs](https://docs.docker.com)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

**Last Updated:** 2024
**Version:** 1.0
