class DefaultController < ApplicationController
  def index
  end

  def contact
  end

  def sandbox
      @board = {
        1 => ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
        2 => ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
        3 => [nil, nil, nil, nil, nil, nil, nil, nil],
        4 => [nil, nil, nil, nil, nil, nil, nil, nil],
        5 => [nil, nil, nil, nil, nil, nil, nil, nil],
        6 => [nil, nil, nil, nil, nil, nil, nil, nil],
        7 => ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
        8 => ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
      }
  end
end
