require 'test_helper'

class PublicControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get public_index_url
    assert_response :success
  end

  test "should get contact" do
    get public_contact_url
    assert_response :success
  end

  test "should get sandbox" do
    get public_sandbox_url
    assert_response :success
  end

end
