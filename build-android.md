# Android 本地打包配置指南

## 环境要求

### 1. 安装 Java JDK
```bash
# 检查 Java 版本（已安装）
java -version
```

### 2. 安装 Android SDK
```bash
# 方法一：使用 Homebrew 安装
brew install android-sdk

# 方法二：手动下载安装
# 1. 下载 Android Studio: https://developer.android.com/studio
# 2. 安装 Android SDK
# 3. 配置环境变量
```

### 3. 配置环境变量
在 `~/.zshrc` 或 `~/.bash_profile` 中添加：

```bash
# Android SDK 路径
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Gradle 路径（如果使用 Homebrew 安装）
export PATH=$PATH:/opt/homebrew/bin
```

### 4. 安装必要的 SDK 组件
```bash
# 安装 Android SDK Build-Tools
sdkmanager "build-tools;30.0.3"

# 安装 Android SDK Platform
sdkmanager "platforms;android-30"

# 安装 Android SDK Platform-Tools
sdkmanager "platform-tools"
```

## 打包步骤

### 1. 使用 HBuilderX 本地打包（推荐）
```bash
# 1. 打开 HBuilderX
# 2. 导入项目
# 3. 点击 "发行" → "原生App-本地打包" → "Android"
# 4. 配置 Android 开发环境路径
# 5. 点击打包
```

### 2. 使用命令行本地打包
```bash
# 安装依赖
npm install

# 本地打包 Android
npm run build:app-android-local

# 打包后的文件在 dist/build/app-android 目录
```

### 3. 手动配置打包
```bash
# 1. 生成 Android 项目
npm run build:app-android

# 2. 进入生成的 Android 项目目录
cd dist/build/app-android

# 3. 使用 Gradle 构建
./gradlew assembleRelease

# 4. APK 文件位置
# dist/build/app-android/app/build/outputs/apk/release/app-release.apk
```

## 证书配置

### 1. 生成测试证书
```bash
# 生成 keystore 文件
keytool -genkey -v -keystore test.keystore -alias test -keyalg RSA -keysize 2048 -validity 10000
```

### 2. 配置证书信息
在 `src/manifest.json` 中添加：

```json
"distribute": {
    "android": {
        "keystore": "test.keystore",
        "password": "your_password",
        "alias": "test",
        "aliasPassword": "your_alias_password"
    }
}
```

## 常见问题

### 1. 找不到 Android SDK
- 确保 ANDROID_HOME 环境变量正确设置
- 确保 Android SDK 已正确安装

### 2. Gradle 构建失败
- 检查网络连接
- 确保 Gradle 版本兼容
- 检查依赖配置

### 3. 证书问题
- 确保证书文件路径正确
- 检查证书密码是否正确
- 确保证书未过期

## 推荐方案

**强烈推荐使用 HBuilderX 本地打包**，因为：
1. 配置简单，图形化界面
2. 自动处理依赖和环境问题
3. 支持热更新和调试
4. 错误提示更友好 