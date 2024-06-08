import { i18nKeys } from '@i18n';
import { Link, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  const { t } = useTranslation();
  return (
    <>
      <Stack.Screen options={{ title: t(i18nKeys.screen.not_found.title) }} />
      <View style={styles.container}>
        <Text style={styles.title}>{t(i18nKeys.screen.not_found.description)}</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>{t(i18nKeys.screen.not_found.button)}</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    color: '#2e78b7',
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
