class TasksController < ApplicationController

  def index
    respond_to do |format|
      @tasks = Task.all
      format.html {} #continue as expected
      format.json {render json: @tasks }
    end
  end

  def create
    respond_to do |format|

      format.json do
        puts params.inspect
        t = Task.new(task_params)
        if t.save
          render json: {msg: 'Success'}
        else
          render json: {msg: 'Error'}
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json { render json: Task.find(params[:id]) }
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :description)
  end

end
