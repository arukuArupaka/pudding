import {
  Capsule,
  HStack,
  Spacer,
  Text,
  VStack,
  ZStack,
} from '@expo/ui/swift-ui';
import {
  clipShape,
  containerBackground,
  font,
  foregroundStyle,
  frame,
  padding,
  strokeBorder,
  widgetURL,
} from '@expo/ui/swift-ui/modifiers';
import { createWidget, type WidgetEnvironment } from 'expo-widgets';

import type { TaskProgressSnapshot } from '../constants/tasks';

const TaskProgressWidget = (
  props: TaskProgressSnapshot,
  environment: WidgetEnvironment
) => {
  'widget';

  const widgetColors = {
    surface: '#FFFDF5',
    text: '#2F2A22',
    mutedText: '#8A8068',
    border: '#E6DDC8',
    primary: '#6A4E2F',
    primarySoft: '#FFF3B8',
    action: '#FFE97A',
  };

  const completedCount = props.completedCount ?? 0;
  const totalCount = props.totalCount ?? 0;
  const progress = Math.max(
    0,
    Math.min(100, props.progress ?? 0)
  );
  const barWidth =
    environment.widgetFamily === 'systemSmall'
      ? 114
      : 294;
  const filledWidth =
    progress === 0
      ? 0
      : Math.max(
          8,
          Math.round(
            barWidth * (progress / 100)
          )
        );

  return (
    <ZStack
      modifiers={[
        containerBackground(widgetColors.surface, 'widget'),
        clipShape('roundedRectangle', 8),
        widgetURL('pudding://tasks'),
        strokeBorder({
          color: widgetColors.border,
          style: {
            lineWidth: 1,
          },
          shape: 'roundedRectangle',
          cornerRadius: 8,
        }),
      ]}
    >
      <VStack
        alignment="leading"
        spacing={0}
        modifiers={[
          frame({
            maxWidth: Infinity,
            maxHeight: Infinity,
            alignment: 'topLeading',
          }),
          padding({ all: 18 }),
        ]}
      >
        <HStack
          modifiers={[
            frame({
              maxWidth: Infinity,
              alignment: 'leading',
            }),
          ]}
        >
          <Text
            modifiers={[
              font({
                size: 16,
                weight: 'bold',
              }),
              foregroundStyle(widgetColors.text),
            ]}
          >
            課題の完了率
          </Text>

          <Spacer />

          <Text
            modifiers={[
              font({
                size: 13,
                weight: 'bold',
              }),
              foregroundStyle(widgetColors.mutedText),
            ]}
          >
            {completedCount} / {totalCount} 件
          </Text>
        </HStack>

        <Text
          modifiers={[
            font({
              size: 34,
              weight: 'heavy',
            }),
            foregroundStyle(widgetColors.primary),
            padding({ top: 10 }),
          ]}
        >
          {progress}%
        </Text>

        <ZStack
          alignment="leading"
          modifiers={[
            frame({
              width: barWidth,
              height: 12,
              alignment: 'leading',
            }),
          ]}
        >
          <Capsule
            modifiers={[
              foregroundStyle(widgetColors.primarySoft),
              frame({
                width: barWidth,
                height: 12,
              }),
            ]}
          />
          {filledWidth > 0 && (
            <Capsule
              modifiers={[
                foregroundStyle(widgetColors.action),
                frame({
                  width: filledWidth,
                  height: 12,
                }),
              ]}
            />
          )}
        </ZStack>

        <Text
          modifiers={[
            font({
              size: 15,
              weight: 'semibold',
            }),
            foregroundStyle(widgetColors.mutedText),
            padding({ top: 10 }),
          ]}
        >
          完了した課題をチェックしよう
        </Text>

        <Spacer />
      </VStack>
    </ZStack>
  );
};

export default createWidget<TaskProgressSnapshot>(
  'TaskProgressWidget',
  TaskProgressWidget
);
