#!/bin/sh

# if [ -z ${FIREBASE_ANDROID_APP_ID+x} ]; then echo "FIREBASE_ANDROID_APP_ID is unset"; fi
if [ -z ${FIREBASE_IOS_APP_ID+x} ]; then echo "FIREBASE_IOS_APP_ID is unset"; fi
# if [ -z ${GOOGLE_APPLICATION_CREDENTIALS+x} ]; then echo "GOOGLE_APPLICATION_CREDENTIALS is unset"; fi

# yarn android:build
# firebase appdistribution:distribute "android/app/build/outputs/bundle/release/app-release.aab" \
#          --app $FIREBASE_ANDROID_APP_ID \
#          --token $FIREBASE_TOKEN \
#          --groups "Everyone"

echo "📦 Archiving Xanyah"

xcodebuild archive \
           -scheme 'Xanyah' \
           -workspace 'ios/Xanyah.xcworkspace' \
           -configuration Release  \
           -archivePath ./.build/ios/Xanyah.xcarchive \
           | xcbeautify

echo "🚚 Exporting to IPA"

xcodebuild -exportArchive \
           -archivePath ./.build/ios/Xanyah.xcarchive \
           -exportPath ./.build/ios/Xanyah.ipa \
           -exportOptionsPlist ios/Export.plist \
           | xcbeautify

last_tag=`git describe --tags --abbrev=0`
previous_tag=`git describe --tags --abbrev=0 $(git rev-list --tags --max-count=2 --skip=1) | sed -n '2p'`
logs="$(git log $previous_tag..$last_tag  --abbrev-commit --oneline | emojify | awk '{$1=""; print $0}')"

echo "🚀 Sending to Firebase"

firebase appdistribution:distribute ./.build/ios/Xanyah.ipa/Xanyah.ipa  \
          --app $FIREBASE_IOS_APP_ID \
          --groups "Everyone" \
          --release-notes "$logs"
