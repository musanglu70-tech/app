@echo off
chcp 65001 > nul
cd /d "E:\1\claude폴드\remix-cso"

set GIT="C:\Program Files\Git\bin\git.exe"

%GIT% config user.name "wooree"
%GIT% config user.email "musanglu70@gmail.com"

%GIT% add -A
%GIT% commit -m "update site"
%GIT% push -u origin main

echo.
echo ==========================================
echo push finished. check messages above.
echo ==========================================
pause
