import { all } from 'redux-saga/effects'
import numTask from './number-task'
import stuTask from './student-task'

/*
  sage 任务
*/
export default function* (){
    const action = yield all([numTask(),stuTask()])  // all指令用于监听所有的saga任务执行完成，数组是生成器执行返回的迭代器
}
