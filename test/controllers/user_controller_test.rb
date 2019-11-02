# frozen_string_literal: true

require 'test_helper'

class UserControllerTest < ActionDispatch::IntegrationTest
  test 'should get new' do
    get user_new_url
    assert_response :success
  end

  test 'should get index' do
    get user_index_url
    assert_response :success
  end

  test 'should get edit' do
    get user_edit_url
    assert_response :success
  end

  test 'should get delete' do
    get user_delete_url
    assert_response :success
  end
end
