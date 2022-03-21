<template>
  <div v-show="visible" :style="style" class="add-node-menu">
    <VCard>
      <VCardHeader>Add person</VCardHeader>
      <VCardText>
        <VTextField v-model="name" label="Name" class="mb-2" hide-details />
        <VSelect
          v-model="gender"
          :items="genders"
          label="Gender"
          class="mb-2"
          hide-details
        />
        <!--
          Vuetify 3.0.0-beta.0
          Btn inside VCardActions doesn't style correctly
          https://github.com/vuetifyjs/vuetify/issues/14845
        -->
        <div class="d-flex justify-end" style="width: 100%">
          <VBtn color="primary" class="text-right" @click="$emit('add-person')">
            Add
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>

<script lang="ts" setup>
import { Gender, InputPerson } from '~/api'

export type AddNodeMenuProps = {
  visible: boolean
  left: number
  top: number
  modelValue: InputPerson
}

const props = defineProps<AddNodeMenuProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', inputPerson: InputPerson): void
  (e: 'add-person')
}>()

const style = computed(() => ({
  left: `${props.left}px`,
  top: `${props.top}px`
}))

const genders = [Gender.MALE, Gender.FEMALE]

const name = computed({
  get() {
    return props.modelValue.name
  },
  set(value: string) {
    emit('update:modelValue', { ...props.modelValue, name: value })
  }
})

const gender = computed({
  get() {
    return props.modelValue.gender
  },
  set(value: Gender) {
    emit('update:modelValue', { ...props.modelValue, gender: value })
  }
})
</script>

<style lang="sass">
.add-node-menu
  position: absolute
  width: 200px
</style>
