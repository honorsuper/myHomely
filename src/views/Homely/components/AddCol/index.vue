<script setup lang="ts">
import { ref, reactive, inject } from 'vue'
import type { FormInstance } from 'ant-design-vue'
// @ts-ignore
import { v4 } from 'uuid'
import { DownSquareOutlined } from '@ant-design/icons-vue'
import { cloneDeep } from 'lodash-es'
import { addMenu, editMenu } from '@/utils/request'
import { message } from 'ant-design-vue'
import { ColorPicker } from '@/components'
import { ITEM_COUNT, GROUP_LINKS_COUNT } from '@/enum/index'
import useAsync from '@/hooks/useQuery'

// 弹窗展示
const open = ref(false)
// 表单
const formRef = ref<FormInstance>()

const dynamicValidateForm = reactive<{
  list: any[]
  mainTitle: string
  id: number | null
  notes: string
}>({
  id: null,
  list: [
    {
      id: v4(),
      index: 0,
      title: '',
      url: '',
      isGroup: 0,
      groupTitle: '',
      color: 0,
    },
  ],
  mainTitle: '',
  notes: '',
})

const homelyInfo = inject<any>('homely')

/**新增menu */
const { run: runAddMenu } = useAsync(addMenu, {
  manual: true,
  onSuccess: () => {
    message.success('新增成功')
    handleCancel()
    setTimeout(() => {
      homelyInfo?.handleGetMenuInfo?.()
    }, 500)
  },
})

/**新增meny */
const { run: runEditMenu } = useAsync(editMenu, {
  manual: true,
  onSuccess: () => {
    message.success('修改成功')
    handleCancel()
    setTimeout(() => {
      homelyInfo?.handleGetMenuInfo?.()
    }, 500)
  },
})

/**
 * 新增链接
 */
const handleAddLink = () => {
  dynamicValidateForm.list.push({
    id: v4(),
    index: dynamicValidateForm.list.length,
    title: '',
    url: '',
    color: 0,
    isGroup: 0,
    groupTitle: '',
    groupList: [],
  })
}

/**
 * 新增组
 */
const handleAddGroup = () => {
  dynamicValidateForm.list.push({
    title: '',
    url: '',
    id: v4(),
    isGroup: 1,
    groupTitle: '',
    groupList: [],
    color: 0,
  })
}

/**
 * 添加子连接
 * @param index 父级索引
 */
const handleAddSub = (index: number) => {
  dynamicValidateForm.list[index].groupList.push({
    subTitle: '',
    subUrl: '',
    id: v4(),
  })
}

/**
 * 提交
 */
const handleSubmit = () => {
  formRef.value?.validate().then(async (values) => {
    if (dynamicValidateForm.id || dynamicValidateForm.id === 0) {
      // 编辑
      const menuList = dynamicValidateForm.list.map((item, index) => {
        return {
          ...item,
          ...values[index],
        }
      })
      runEditMenu({
        id: dynamicValidateForm.id,
        list: menuList,
        mainTitle: dynamicValidateForm.mainTitle,
        notes: dynamicValidateForm.notes,
      })
    } else {
      // 新增
      const menuList = dynamicValidateForm.list.map((item, index) => {
        return {
          ...item,
          ...values[index],
        }
      })

      runAddMenu({
        list: menuList,
        mainTitle: dynamicValidateForm.mainTitle,
        notes: dynamicValidateForm.notes,
      })
    }
  })
}

/**
 * 取消
 */
const handleCancel = () => {
  open.value = false
  dynamicValidateForm.list = [
    {
      id: v4(),
      index: 0,
      title: '',
      url: '',
      isGroup: 0,
      groupTitle: '',
      color: 0,
    },
  ]
  dynamicValidateForm.id = null
  dynamicValidateForm.mainTitle = ''
  dynamicValidateForm.notes=''
}

/**
 * 打开弹窗
 */
const handleOpenModal = (info?: any) => {
  if (info) {
    dynamicValidateForm.id = info?.id
    dynamicValidateForm.mainTitle = info?.mainTitle
    dynamicValidateForm.notes = info?.notes
    dynamicValidateForm.list = cloneDeep(info?.list)
  }
  if (!info) {
    if (homelyInfo?.getColumnInfo?.()?.length > 9) {
      return message.warning('最多新建10列')
    }
  }
  open.value = true
}

/**
 * 上移
 * @param index 当前操作索引
 * @param isTop 是否移动到最顶部
 */
const handleMoveUp = (index: number, isTop = false) => {
  if (isTop) {
    const currentInfo = dynamicValidateForm.list.splice(index, 1)
    dynamicValidateForm.list.unshift(currentInfo[0])
  } else {
    const preIndex = index - 1
    const cloneList = cloneDeep(dynamicValidateForm.list)
    dynamicValidateForm.list[preIndex] = cloneList[index]
    dynamicValidateForm.list[index] = cloneList[preIndex]
  }
}

/**
 * 下移
 * @param index 当前操作索引
 * @param isBottom 是否移动到最底部
 */
const handleMoveDown = (index: number, isBottom = false) => {
  if (isBottom) {
    const currentInfo = dynamicValidateForm.list.splice(index, 1)
    dynamicValidateForm.list.push(currentInfo[0])
  } else {
    const nextIndex = index + 1
    const cloneList = cloneDeep(dynamicValidateForm.list)
    dynamicValidateForm.list[nextIndex] = cloneList[index]
    dynamicValidateForm.list[index] = cloneList[nextIndex]
  }
}

/**
 * 删除
 * @param index 当前操作索引
 */
const handleDel = (index: number) => {
  dynamicValidateForm.list.splice(index, 1)
}

/**
 * 上移
 * @param index 当前操作索引
 * @param subIndex 子模块的索引
 * @param isTop 是否移动到最顶部
 */
const handleSubMoveUp = (index: number, subIndex: number, isTop = false) => {
  if (isTop) {
    const currentInfo = dynamicValidateForm.list[index].groupList.splice(subIndex)
    dynamicValidateForm.list[index].groupList.unshift(currentInfo[0])
  } else {
    const preIndex = subIndex - 1
    const cloneList = cloneDeep(dynamicValidateForm.list)
    dynamicValidateForm.list[index].groupList[preIndex] = cloneList[index].groupList[subIndex]
    dynamicValidateForm.list[index].groupList[subIndex] = cloneList[index].groupList[preIndex]
  }
}

/**
 * 下移
 * @param index 当前操作索引
 * @param subIndex 子模块的索引
 * @param isBottom 是否移动到最底部
 */
const handleSubMoveDown = (index: number, subIndex: number, isBottom = false) => {
  if (isBottom) {
    const currentInfo = dynamicValidateForm.list[index].groupList.splice(subIndex, 1)
    dynamicValidateForm.list[index].groupList.push(currentInfo[0])
  } else {
    const nextIndex = subIndex + 1
    const cloneList = cloneDeep(dynamicValidateForm.list)
    dynamicValidateForm.list[index].groupList[nextIndex] = cloneList[index].groupList[subIndex]
    dynamicValidateForm.list[index].groupList[subIndex] = cloneList[index].groupList[nextIndex]
  }
}

/**
 * 删除
 * @param index 当前操作索引
 * @param subIndex 子模块的索引
 */
const handleSubDel = (index: number, subIndex: number) => {
  dynamicValidateForm.list[index].groupList.splice(subIndex, 1)
}

/**
 * 转为菜单
 * @param index 当前操作索引
 */
const convertToMenu = (index: number) => {
  const { title, url, id } = dynamicValidateForm.list[index]
  dynamicValidateForm.list[index] = {
    title: '',
    url: '',
    id: v4(),
    isGroup: 1,
    groupTitle: '',
    groupList: [
      {
        subTitle: title,
        subUrl: url,
        id,
      },
    ],
  }
}

const labelCol = { style: { width: '65px' } };

defineExpose({
  handleOpenModal,
})
</script>
<template>
  <a-modal v-model:open="open" :title="dynamicValidateForm.id?'编辑':'新增'" :width="750">
    <div class="inner-form">
      <a-form ref="formRef" name="dynamic_form_nest_item" :model="dynamicValidateForm" :label-col="labelCol">
        <a-form-item
          name="mainTitle"
          label="主标题"
          :rules="[{ required: true, message: '请输入主标题' }]"
        >
          <a-input v-model:value="dynamicValidateForm.mainTitle" />
        </a-form-item>
        <a-form-item name="notes" label="  备注">
          <a-input v-model:value="dynamicValidateForm.notes" />
        </a-form-item>
        <div v-for="(user, index) in dynamicValidateForm.list" :key="user.id" class="dynamic-wrap">
          <template v-if="!user.isGroup">
            <a-form-item
              :name="['list', index, 'title']"
              :rules="{
                required: true,
                message: '请输入标题',
              }"
              label="标题"
            >
              <a-input v-model:value="user.title" placeholder="请输入标题" :maxlength="20" />
            </a-form-item>
            <a-form-item
              label="链接"
              :name="['list', index, 'url']"
              :rules="{
                required: true,
                message: '请输入链接',
              }"
            >
              <a-input v-model:value="user.url" placeholder="请输入链接" :maxlength="100" />
            </a-form-item>
            <a-form-item
              label="颜色"
              :name="['list', index, 'color']"
              :rules="{
                required: true,
                message: '请输入颜色',
              }"
            >
              <ColorPicker v-model:value="user.color" />
            </a-form-item>
            <div class="flex justify-end cursor-pointer editIcon">
              <a-dropdown>
                <DownSquareOutlined />
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="0" @click="handleMoveUp(index, true)" v-if="index > 0">
                      移动到顶部
                    </a-menu-item>
                    <a-menu-item key="1" @click="handleMoveUp(index)" v-if="index > 0"
                      >上移
                    </a-menu-item>
                    <a-menu-item
                      key="2"
                      @click="handleMoveDown(index)"
                      v-if="index < dynamicValidateForm.list.length - 1"
                      >下移
                    </a-menu-item>
                    <a-menu-item
                      key="3"
                      @click="handleMoveDown(index, true)"
                      v-if="index < dynamicValidateForm.list.length - 1"
                    >
                      移动到底部
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="4" @click="convertToMenu(index)"> 转为菜单</a-menu-item>
                    <a-menu-divider />
                    <a-menu-item
                      key="5"
                      @click="handleDel(index)"
                      :disabled="dynamicValidateForm.list?.length === 1"
                    >
                      删除
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </template>
          <template v-else>
            <a-form-item
              :name="['list', index, 'groupTitle']"
              :rules="{
                required: true,
                message: '请输入组标题',
              }"
              label="组标题"
            >
              <a-input v-model:value="user.groupTitle" placeholder="请输入组标题" :maxlength="20" />
            </a-form-item>
            <div
              v-for="(innerUser, innerIndex) in user.groupList"
              :key="innerUser.id"
              class="inner-dynamic-wrap"
            >
              <a-form-item
                :name="['list', index, 'groupList', innerIndex, 'subTitle']"
                :rules="{
                  required: true,
                  message: '请输入标题',
                }"
                label="标题"
              >
                <a-input
                  v-model:value="innerUser.subTitle"
                  placeholder="请输入标题"
                  :maxlength="20"
                />
              </a-form-item>
              <a-form-item
                :name="['list', index, 'groupList', innerIndex, 'subUrl']"
                :rules="{
                  required: true,
                  message: '请输入链接',
                }"
                label="链接"
              >
                <a-input
                  v-model:value="innerUser.subUrl"
                  placeholder="请输入链接"
                  :maxlength="100"
                />
              </a-form-item>

              <div class="flex justify-end cursor-pointer editIcon">
                <a-dropdown>
                  <DownSquareOutlined />
                  <template #overlay>
                    <a-menu>
                      <a-menu-item
                        key="0"
                        @click="handleSubMoveUp(index, innerIndex, true)"
                        v-if="innerIndex > 0"
                      >
                        移动到顶部
                      </a-menu-item>
                      <a-menu-item
                        key="1"
                        v-if="innerIndex > 0"
                        @click="handleSubMoveUp(index, innerIndex)"
                        >上移
                      </a-menu-item>
                      <a-menu-item
                        key="2"
                        v-if="innerIndex < dynamicValidateForm.list[index].groupList.length - 1"
                        @click="handleSubMoveDown(index, innerIndex)"
                        >下移
                      </a-menu-item>
                      <a-menu-item
                        key="3"
                        v-if="innerIndex < dynamicValidateForm.list[index].groupList.length - 1"
                        @click="handleSubMoveDown(index, innerIndex, true)"
                      >
                        移动到底部
                      </a-menu-item>
                      <a-menu-divider />
                      <a-menu-item key="5" @click="handleSubDel(index, innerIndex)">
                        删除1
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
            </div>
            <a-form-item
              :name="['list', index, 'color']"
              :rules="{
                required: true,
                message: '请选择颜色',
              }"
              label="颜色"
            >
              <ColorPicker v-model:value="user.color" />
            </a-form-item>
            <div class="flex justify-between items-center">
              <a-button
                key="submit"
                type="primary"
                @click="() => handleAddSub(index)"
                :style="{ marginBottom: '10px' }"
                :disabled="
                  dynamicValidateForm.list[index].groupList?.length > GROUP_LINKS_COUNT - 1
                "
                >新增链接
              </a-button>
              <a-dropdown>
                <DownSquareOutlined />
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="0" @click="handleMoveUp(index, true)" v-if="index > 0">
                      移动到顶部
                    </a-menu-item>
                    <a-menu-item key="1" @click="handleMoveUp(index)" v-if="index > 0"
                      >上移
                    </a-menu-item>
                    <a-menu-item
                      key="2"
                      @click="handleMoveDown(index)"
                      v-if="index < dynamicValidateForm.list.length - 1"
                      >下移
                    </a-menu-item>
                    <a-menu-item
                      key="3"
                      @click="handleMoveDown(index, true)"
                      v-if="index < dynamicValidateForm.list.length - 1"
                    >
                      移动到底部
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item
                      key="5"
                      @click="handleDel(index)"
                      :disabled="dynamicValidateForm.list?.length === 1"
                    >
                      删除
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </template>
        </div>
      </a-form>
    </div>
    <template #footer>
      <div class="flex justify-between">
        <div>
          <a-button
            type="primary"
            @click="handleAddLink"
            :disabled="dynamicValidateForm.list.length > ITEM_COUNT - 1"
            >新增链接
          </a-button>
          <a-button
            type="primary"
            @click="handleAddGroup"
            :disabled="dynamicValidateForm.list.length > ITEM_COUNT - 1"
            >新增组
          </a-button>
        </div>
        <div>
          <a-button key="back" @click="handleCancel">取消</a-button>
          <a-button key="submit" type="primary" @click="handleSubmit">提交</a-button>
        </div>
      </div>
    </template>
  </a-modal>
</template>
<style scoped lang="less">
@import './index.less';
</style>
