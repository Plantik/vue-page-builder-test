import { expect, describe, it } from "vitest";
import { shallowMount } from '@vue/test-utils'
import DropZone from '@/components/DropZone.vue'


describe('DropZone', () => {


  it('sets new image link correctly', async () => {
    const wrapper = shallowMount(DropZone)    
    // Mock the data
    const mockIndex = 1 // Check link for the second object in the array
    const mockImageCardId = 435345
    const mockSelectedImage = 'new-image.jpg'

    // Set the mock data
    wrapper.vm.blocks = [
      { imgLink: 'image1.jpg' },
      { imgLink: 'new-image.jpg' },
    ]
    wrapper.vm.imageCardId = mockImageCardId
    wrapper.vm.selectedImage = mockSelectedImage

    // Call the setNewImage function
    wrapper.vm.setNewImage()
    

    // Assert that the image link was prepared for update correctly
    const expectedImgLink = `${mockSelectedImage}`
    expect(wrapper.vm.blocks[mockIndex].imgLink).toBe(expectedImgLink)
  })

})


