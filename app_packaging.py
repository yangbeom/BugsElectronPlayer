from subprocess import call
from pathlib import Path
from json import loads
from shutil import rmtree,make_archive

appname = 'BugsElectronPlayer'
platforms = ['-linux-x64', '-darwin-x64']

with open('./package.json', 'r') as f:
    version = '-v' + loads(f.read())['version']

pacakging = 'electron-packager . --ignore="node_modules|app_packaging.py"\
            --icon="./src/icon.icns" --platform=linux,darwin'

for platform in platforms:
    if Path(appname+platform).exists():
        rmtree(appname+platform)

call(pacakging,shell=True)
for platform in platforms:
    make_archive(appname+version+platform, 'zip', appname+platform)
