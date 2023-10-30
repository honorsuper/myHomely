<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'ant-design-vue'
// 弹窗展示
const open = ref(true)

const formRef = ref<FormInstance>()
const visible = ref(false)
const formState = reactive({
  mainTitle: '',
  description: '',
  modifier: 'public'
})

const dynamicValidateForm = reactive({
  users: [],
  mainTitle: ''
})

const handleAddLink = () => {
  dynamicValidateForm.users.push({
    first: '',
    last: '',
    id: Date.now(),
    isGroup: 0,
    groupTitle: ''
  })
}

const handleAddGroup = () => {
  dynamicValidateForm.users.push({
    first: '',
    last: '',
    id: Date.now(),
    isGroup: 1,
    groupTitle: '',
    groupList: []
  })
}

const handleAddSub = (index: number) => {
  dynamicValidateForm.users[index].groupList.push({
    subTitle: '',
    subUrl: '',
    id: Date.now()
  })
}

const handleSubmit = () => {
  formRef.value?.validate().then((values) => {
    console.log('values', values)
  })
}

const handleCancel = () => {
  open.value = false
  dynamicValidateForm.users = []
  dynamicValidateForm.mainTitle = ''
}
</script>
<template>
  <div>
    <a-modal v-model:open="open" title="新增" ok-text="确认" cancel-text="取消" :width="750">
      <div class="inner-form">
        <a-form ref="formRef" name="dynamic_form_nest_item" :model="dynamicValidateForm">
          <a-form-item
            name="mainTitle"
            label="主标题"
            :rules="[{ required: true, message: '请输入主标题' }]"
          >
            <a-input v-model:value="dynamicValidateForm.mainTitle" />
          </a-form-item>
          <div
            v-for="(user, index) in dynamicValidateForm.users"
            :key="user.id"
            class="dynamic-wrap"
          >
            <template v-if="!user.isGroup">
              <a-form-item
                :name="['users', index, 'title']"
                :rules="{
                  required: true,
                  message: '请输入标题'
                }"
                label="标题"
              >
                <a-input v-model:value="user.title" placeholder="请输入标题" />
              </a-form-item>
              <a-form-item
                label="链接"
                :name="['users', index, 'url']"
                :rules="{
                  required: true,
                  message: '请输入链接'
                }"
              >
                <a-input v-model:value="user.url" placeholder="请输入链接" />
              </a-form-item>
            </template>
            <template v-else>
              <a-form-item
                :name="['users', index, 'groupTitle']"
                :rules="{
                  required: true,
                  message: '请输入组标题'
                }"
                label="组标题"
              >
                <a-input v-model:value="user.groupTitle" placeholder="请输入组标题" />
              </a-form-item>
              <div
                v-for="(innerUser, innerIndex) in user.groupList"
                :key="innerUser.id"
                class="inner-dynamic-wrap"
              >
                <a-form-item
                  :name="['users', index, 'groupList', innerIndex, 'subTitle']"
                  :rules="{
                    required: true,
                    message: '请输入标题'
                  }"
                  label="标题"
                >
                  <a-input v-model:value="innerUser.subTitle" placeholder="请输入标题" />
                </a-form-item>
                <a-form-item
                  :name="['users', index, 'groupList', innerIndex, 'subUrl']"
                  :rules="{
                    required: true,
                    message: '请输入链接'
                  }"
                  label="标题"
                >
                  <a-input v-model:value="innerUser.subUrl" placeholder="请输入链接" />
                </a-form-item>
              </div>
              <a-button
                key="submit"
                type="primary"
                @click="() => handleAddSub(index)"
                :style="{ marginBottom: '10px' }"
                >新增链接
              </a-button>
            </template>
          </div>
        </a-form>
      </div>
      <template #footer>
        <div class="flex justify-between">
          <div>
            <a-button type="primary" @click="handleAddLink">新增链接</a-button>
            <a-button type="primary" @click="handleAddGroup">新增组</a-button>
          </div>
          <div>
            <a-button key="back" @click="handleCancel">取消</a-button>
            <a-button key="submit" type="primary" @click="handleSubmit">提交</a-button>
          </div>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<style scoped lang="less">
.dynamic-wrap {
  background: whitesmoke;
  margin-bottom: 20px;
  padding: 20px 10px 1px 10px;
}

.inner-dynamic-wrap {
  background: antiquewhite;
  margin-bottom: 20px;
  padding: 20px 10px 1px 10px;
}

.inner-form {
  max-height: 500px;
  overflow-y: auto;
}
</style>
