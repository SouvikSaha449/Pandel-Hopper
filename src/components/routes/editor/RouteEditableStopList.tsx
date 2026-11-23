import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPuja, pujaName } from '@/data/pujas';
import { walkMinutes } from '@/data/geo';
import { formatMetroName } from '@/data/metro';
import { usePrefs } from '@/store/prefs';
import { StopConnector } from '../shared/StopConnector';
import { StopOrderItem } from './StopOrderItem';
import { TransitAnchorCard } from '../shared/TransitAnchorCard';
import type { useRouteEditor } from '@/hooks/use-route-editor';

interface RouteEditableStopListProps {
  editor: ReturnType<typeof useRouteEditor>;
  onStopPress: (index: number, name: string) => void;
  onOpenAddSheet: () => void;
}

export function RouteEditableStopList({
  editor,
  onStopPress,
  onOpenAddSheet,
}: RouteEditableStopListProps) {
  const lang = usePrefs((s) => s.lang);

  return (
    <View style={styles.container}>

      {editor.firstTransit && (
        <TransitAnchorCard
          type="start"
          stationName={formatMetroName(editor.firstTransit.stationName, lang)}
          walkMinutes={editor.firstTransit.walkMinutes}
        />
      )}

      <View style={styles.stopsList}>
        {editor.stops.map((stopId, index) => {
          const puja = getPuja(stopId);
          if (!puja) return null;

          const prevPuja = index > 0 ? getPuja(editor.stops[index - 1]) : null;
          const walkMin = prevPuja ? walkMinutes(prevPuja.loc, puja.loc) : 0;
          const name = pujaName(puja, lang);

          return (
            <View key={stopId}>
              {index > 0 && walkMin > 0 && (
                <StopConnector walkMinutes={walkMin} />
              )}

              <StopOrderItem
                index={index}
                isFirst={index === 0}
                isLast={index === editor.stops.length - 1}
                pujaName={name}
                onPress={() => onStopPress(index, name)}
                onMoveUp={() => editor.moveUp(index)}
                onMoveDown={() => editor.moveDown(index)}
                onRemove={() => editor.removeStop(index)}
              />
            </View>
          );
        })}
      </View>

      {editor.lastTransit && (
        <TransitAnchorCard
          type="end"
          stationName={formatMetroName(editor.lastTransit.stationName, lang)}
          walkMinutes={editor.lastTransit.walkMinutes}
        />
      )}

      <Pressable
        accessibilityRole="button"
        onPress={onOpenAddSheet}
        style={({ pressed }) => [
          styles.addPujaBtn,
          {
            borderColor: editor.colors.accent,
            backgroundColor: editor.colors.card,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <Ionicons name="add" size={20} color={editor.colors.accent} />
        <Text style={[styles.addPujaBtnText, { color: editor.colors.accent }]}>
          {editor.t('routes.addPuja')}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  stopsList: {
    marginVertical: 4,
  },
  addPujaBtn: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  addPujaBtnText: {
    fontSize: 15,
    fontWeight: '700',
  },
});