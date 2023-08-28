
import { expect, describe, it } from "vitest";
import { shallowMount } from '@vue/test-utils'
import ImageBlock from '@/components/ImageBlock.vue'

describe('ImageBlock', () => {
  it('should show ActionBox when clicked', async () => {
    const wrapper = shallowMount(ImageBlock)
    // Click the component to trigger the action box

    await wrapper.find('#imageBlock').trigger('click')
    
    // Assert that the action box is now visible
    expect(wrapper.vm.isActionBoxVisible).toBe(true)
  })

  it('should emit changeImage when "Change image" button is clicked', async () => {
    const wrapper = shallowMount(ImageBlock)

    // Click the "Change image" button
    await wrapper.find('#changeImageBtn').trigger('mousedown.prevent')
    expect(wrapper.emitted('changeImage')).toBeTruthy()


  })
  it('should emit duplicateImage when "Duplicate image" button is clicked', async () => {
    const wrapper = shallowMount(ImageBlock)


    // Click the "Duplicate image" button
    await wrapper.find('#duplicateImageBtn').trigger('mousedown.prevent')
    expect(wrapper.emitted('duplicateImage')).toBeTruthy()

  })
  it('should emit deleteImage when "Delete image" button is clicked', async () => {
    const wrapper = shallowMount(ImageBlock)

    // Click the "Delete image" button
    await wrapper.find('#deleteImageBtn').trigger('mousedown.prevent')
    expect(wrapper.emitted('deleteImage')).toBeTruthy()

    
  })

})
