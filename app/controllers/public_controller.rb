class PublicController < ApplicationController

  skip_before_action :ensure_authenticated_user
  
  def index
  end

  def contact
  end

  def sandbox
    @board = {
      'a' => ['wr', 'wp', nil, nil, nil, nil, 'bp', 'br'],
      'b' => ['wn', 'wp', nil, nil, nil, nil, 'bp', 'bn'],
      'c' => ['wb', 'wp', nil, nil, nil, nil, 'bp', 'bb'],
      'd' => ['wq', 'wp', nil, nil, nil, nil, 'bp', 'bq'],
      'e' => ['wk', 'wp', nil, nil, nil, nil, 'bp', 'bk'],
      'f' => ['wb', 'wp', nil, nil, nil, nil, 'bp', 'bb'],
      'g' => ['wn', 'wp', nil, nil, nil, nil, 'bp', 'bn'],
      'h' => ['wr', 'wp', nil, nil, nil, nil, 'bp', 'br'],
    }
  end
end
