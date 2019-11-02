# frozen_string_literal: true

require 'test_helper'

class ChallengeControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get challenge_index_url
    assert_response :success
  end

  test 'should get show' do
    get challenge_show_url
    assert_response :success
  end

  test 'should get edit' do
    get challenge_edit_url
    assert_response :success
  end

  test 'should get delete' do
    get challenge_delete_url
    assert_response :success
  end
end
