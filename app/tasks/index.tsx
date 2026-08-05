import { Link } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Screen } from '../../components/Screen';


const initialTasks = [
  {
    id: '1',
    title: '数学プリント',
    subject: '数学',
    due: '今日',
    completed: false,
  },
  {
    id: '2',
    title: '英単語テスト',
    subject: '英語',
    due: '8月1日',
    completed: false,
  },
  {
    id: '3',
    title: 'レポート提出',
    subject: '情報',
    due: '8月5日',
    completed: false,
  },
];


export default function TasksScreen() {

  const [tasks, setTasks] =
    useState(initialTasks);



  const toggleTask = (id: string) => {

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed:
                !task.completed,
            }
          : task
      )
    );

  };



  const activeTasks =
    tasks.filter(
      (task) =>
        !task.completed
    );


  const completedTasks =
    tasks.filter(
      (task) =>
        task.completed
    );



  const completedCount =
    completedTasks.length;


  const totalCount =
    tasks.length;


  const progress =
    totalCount === 0
      ? 0
      : Math.round(
          (completedCount /
            totalCount) *
            100
        );



  return (

    <Screen
      title="課題一覧"
      subtitle="提出する課題"
    >

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >


        {/* 完了率 */}

        <View style={styles.progressCard}>

          <Text style={styles.progressTitle}>
            課題の完了率
          </Text>


          <Text style={styles.progressNumber}>
            {progress}%
          </Text>


          <View
            style={
              styles.progressBarBackground
            }
          >

            <View
              style={[
                styles.progressBar,
                {
                  width:
                    `${progress}%`,
                },
              ]}
            />

          </View>


          <Text style={styles.progressText}>
            {completedCount} / {totalCount} 件完了
          </Text>


        </View>

        {/* 課題追加 */}

        <Link
          href="/tasks/add"
          asChild
        >

          <Pressable
            style={styles.addButton}
          >

            <Text
              style={styles.addText}
            >
              ＋ 課題を追加
            </Text>


          </Pressable>


        </Link>




        {/* 未提出課題 */}

        {activeTasks.map(
          (task) => (

            <View
              key={task.id}
              style={styles.card}
            >


              <Pressable
                style={styles.left}
                onPress={() =>
                  toggleTask(task.id)
                }
              >

                <View
                  style={styles.checkbox}
                />

              </Pressable>




              <View
                style={styles.center}
              >

                <Text
                  style={styles.title}
                >
                  {task.title}
                </Text>


                <Text
                  style={styles.subject}
                >
                  {task.subject}
                </Text>


              </View>




              <View
                style={styles.right}
              >

                <View
                  style={styles.badge}
                >

                  <Text
                    style={styles.badgeText}
                  >
                    締切：{task.due}
                  </Text>

                </View>

              </View>


            </View>

          )
        )}






        {/* 提出済み課題 */}

        {completedTasks.length > 0 && (

          <>

            <Text
              style={styles.completedTitle}
            >
              提出済み課題
            </Text>



            {completedTasks.map(
              (task) => (

                <View
                  key={task.id}
                  style={[
                    styles.card,
                    styles.completedCard,
                  ]}
                >



                  <Pressable
                    style={[
                      styles.checkbox,
                      styles.checkedBox,
                    ]}
                    onPress={() =>
                      toggleTask(task.id)
                    }
                  >

                    <Text
                      style={styles.check}
                    >
                      ✓
                    </Text>


                  </Pressable>




                  <View
                    style={styles.center}
                  >

                    <Text
                      style={[
                        styles.title,
                        styles.completedText,
                      ]}
                    >
                      {task.title}
                    </Text>


                    <Text
                      style={styles.subject}
                    >
                      {task.subject}
                    </Text>


                  </View>



                </View>

              )
            )}


          </>

        )}



      </ScrollView>


    </Screen>

  );

}
const styles = StyleSheet.create({

  // 完了率カード

  progressCard: {

    backgroundColor:'#FFFDF5',

    borderRadius:26,

    padding:22,

    marginBottom:24,


    shadowColor:'#C8B98A',

    shadowOpacity:0.15,

    shadowRadius:12,

    shadowOffset:{
      width:0,
      height:5,
    },

    elevation:4,

  },


  progressTitle:{

    fontSize:16,

    color:'#8A8068',

    fontWeight:'700',

  },


  progressNumber:{

    fontSize:34,

    fontWeight:'800',

    color:'#6A4E2F',

    marginVertical:8,

  },


  progressBarBackground:{

    height:14,

    backgroundColor:'#EEE4C8',

    borderRadius:10,

    overflow:'hidden',

  },


  progressBar:{

    height:'100%',

    backgroundColor:'#FFE97A',

    borderRadius:10,

  },


  progressText:{

    marginTop:10,

    color:'#8A8068',

    fontSize:15,

    fontWeight:'600',

  },




  // 課題追加ボタン

  addButton:{

    backgroundColor:'#FFE97A',

    borderRadius:35,

    paddingVertical:20,


    alignItems:'center',

    justifyContent:'center',


    marginBottom:26,


    shadowColor:'#B49A40',

    shadowOpacity:0.18,

    shadowRadius:12,


    shadowOffset:{
      width:0,
      height:5,
    },


    elevation:5,

  },


  addText:{

    fontSize:20,

    fontWeight:'700',

    color:'#6A4E2F',

  },




  // 課題カード

  card:{

    flexDirection:'row',

    alignItems:'center',


    backgroundColor:'#FFFDF5',


    borderRadius:26,


    paddingVertical:24,

    paddingHorizontal:22,


    marginBottom:18,



    shadowColor:'#C8B98A',

    shadowOpacity:0.15,

    shadowRadius:14,


    shadowOffset:{
      width:0,
      height:6,
    },


    elevation:4,

  },



  completedCard:{

    opacity:0.65,

  },



  left:{

    marginRight:18,

  },



  checkbox:{

    width:30,

    height:30,


    borderRadius:15,


    borderWidth:3,


    borderColor:'#D8C89D',


    backgroundColor:'#FFFDF5',


    alignItems:'center',

    justifyContent:'center',

  },



  checkedBox:{

    backgroundColor:'#FFE97A',

    borderColor:'#FFE97A',

  },



  check:{

    fontSize:20,

    fontWeight:'700',

    color:'#6A4E2F',

  },



  center:{

    flex:1,

  },



  title:{

    fontSize:21,

    fontWeight:'700',

    color:'#2F2F2F',

  },



  completedText:{

    textDecorationLine:'line-through',

  },



  subject:{

    marginTop:6,

    fontSize:16,

    color:'#8A8068',

  },



  right:{},



  badge:{

    backgroundColor:'#FFD9D6',


    paddingHorizontal:13,

    paddingVertical:8,


    borderRadius:20,

  },



  badgeText:{

    color:'#B14444',


    fontSize:14,


    fontWeight:'700',

  },



  completedTitle:{

    fontSize:22,

    fontWeight:'700',

    color:'#6A4E2F',


    marginTop:15,

    marginBottom:15,

  },


});
