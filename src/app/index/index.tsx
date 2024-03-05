import { View, Text, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { styles } from './styles';
import { Ingredient } from '@/components/Ingredient';
import { useState } from 'react';
import { Selected } from '@/components/Selected';

export default function Index() {
  const [selected, setSelected] = useState<string[]>([]);

  function handleToggleSelected(value: string) {
    if (selected.includes(value)) {
      return setSelected((prev) => prev.filter((item) => item !== value));
    }

    setSelected((prev) => [...prev, value]);
    console.log('SELECTEDS: ', selected);
  }

  function handleClearSelected() {
    Alert.alert('Limpar', 'Você deseja limpar os ingredientes selecionados?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => setSelected([]) },
    ]);
  }

  function handleSearch() {
    router.navigate('/recipes/');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha {'\n'}
        <Text style={styles.subtitle}>os produtos</Text>
      </Text>

      <Text style={styles.message}>Descubra receitas baseadas nos produtos que você escolheu</Text>

      <ScrollView contentContainerStyle={styles.ingredients} showsVerticalScrollIndicator={false}>
        {Array.from({ length: 50 }).map((item, index) => (
          <Ingredient
            key={index}
            name='Maça'
            image=''
            selected={selected.includes(String(index))}
            onPress={() => handleToggleSelected(String(index))}
          />
        ))}
      </ScrollView>

      {selected.length > 0 && <Selected quantity={selected.length} onClear={handleClearSelected} onSearch={handleSearch} />}
    </View>
  );
}
