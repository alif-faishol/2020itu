#!/usr/bin/env bash
sudo certbot --nginx --debug --non-interactive --email %EMAIL% --agree-tos --domains %DOMAIN% --keep
