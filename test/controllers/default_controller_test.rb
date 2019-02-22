require 'test_helper'

class DefaultControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get default_index_url
    assert_response :success
  end

  test "should get contact" do
    get default_contact_url
    assert_response :success
  end

  test "should get sandbox" do
    get default_sandbox_url
    assert_response :success
  end

end
