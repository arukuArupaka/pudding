import { type Href, router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const loginColors = {
  background: "#FFF8E8",
  surface: "#FFFFFF",
  text: "#3D3028",
  mutedText: "#8A7A6D",
  border: "#D9C9B2",
  custard: "#F4D889",
  caramel: "#9A5B32",
  placeholder: "#AA9A8E",
};

const noop = () => undefined;
const homeRoute = "/home" as Href;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.intro}>
              <Text style={styles.wordmark}>pudding</Text>
              <View style={styles.wordmarkAccent} />
            </View>

            <View style={styles.form}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>メールアドレス</Text>
                <TextInput
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  placeholder="name@example.com"
                  placeholderTextColor={loginColors.placeholder}
                  style={styles.input}
                  textContentType="emailAddress"
                  value={email}
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>パスワード</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect={false}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                    style={[styles.input, styles.passwordInput]}
                    textContentType="password"
                    value={password}
                  />
                  <Pressable
                    accessibilityLabel={
                      isPasswordVisible
                        ? "パスワードを隠す"
                        : "パスワードを表示"
                    }
                    accessibilityRole="button"
                    hitSlop={8}
                    onPress={() => setIsPasswordVisible((visible) => !visible)}
                    style={({ pressed }) => [
                      styles.visibilityButton,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.visibilityText}>パスワードを表示</Text>
                  </Pressable>
                </View>
              </View>

              <Pressable
                accessibilityRole="button"
                onPress={noop}
                style={({ pressed }) => [
                  styles.forgotButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.textLink}>パスワードを忘れた方</Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                onPress={() => router.replace(homeRoute)}
                style={({ pressed }) => [
                  styles.loginButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.loginButtonText}>ログイン</Text>
              </Pressable>
            </View>

            <View style={styles.registration}>
              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>はじめての方はこちら</Text>
                <View style={styles.divider} />
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={noop}
                style={({ pressed }) => [
                  styles.registerButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.registerButtonText}>新規登録</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: loginColors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 56,
  },
  content: {
    width: "100%",
    maxWidth: 420,
  },
  intro: {
    alignItems: "center",
    marginBottom: 48,
  },
  wordmark: {
    color: loginColors.text,
    fontSize: 60,
    fontWeight: "800",
    letterSpacing: -2,
    lineHeight: 68,
  },
  wordmarkAccent: {
    width: 56,
    height: 5,
    marginTop: 14,
    marginBottom: 38,
    borderRadius: 999,
    backgroundColor: loginColors.custard,
  },
  heading: {
    color: loginColors.text,
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 42,
    textAlign: "center",
  },
  subtitle: {
    color: loginColors.mutedText,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  fieldGroup: {
    gap: 10,
    marginBottom: 24,
  },
  label: {
    color: loginColors.text,
    fontSize: 15,
    fontWeight: "700",
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: loginColors.border,
    borderRadius: 12,
    backgroundColor: loginColors.surface,
    color: loginColors.text,
    fontSize: 16,
    paddingHorizontal: 16,
  },
  passwordInputContainer: {
    position: "relative",
    justifyContent: "center",
  },
  passwordInput: {
    paddingRight: 156,
  },
  visibilityButton: {
    position: "absolute",
    right: 16,
    justifyContent: "center",
    minHeight: 44,
  },
  visibilityText: {
    color: loginColors.caramel,
    fontSize: 14,
    fontWeight: "600",
  },
  forgotButton: {
    alignSelf: "flex-end",
    justifyContent: "center",
    minHeight: 44,
    marginTop: -10,
    marginBottom: 24,
  },
  textLink: {
    color: loginColors.caramel,
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  loginButton: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: loginColors.caramel,
  },
  loginButtonText: {
    color: loginColors.surface,
    fontSize: 17,
    fontWeight: "700",
  },
  registration: {
    marginTop: 36,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 28,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: loginColors.border,
  },
  dividerText: {
    color: loginColors.mutedText,
    fontSize: 14,
    fontWeight: "500",
  },
  registerButton: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: loginColors.caramel,
    borderRadius: 12,
  },
  registerButtonText: {
    color: loginColors.caramel,
    fontSize: 17,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.72,
  },
});
