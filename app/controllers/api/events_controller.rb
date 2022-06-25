class Api::EventsController < ApplicationController
  before_action :set_event, only: %i[show update destroy]
 
  # React hits /events with a GET method 
  def index
    @events = Event.all
    render json: @events
  end

  # React hits /events/:eventID with a GET method 
  def show
    render json: @event
  end

  # React hits /events with a POST method
  def create
    @event = Event.new(event_params)

    if @event.save
      render json: @event, status: :created
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # React hits /events/:eventID with PUT method
  def update
    if @event.update(event_params)
      render json: @event, status: :ok
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # React hits /events/:eventID with DELETE method
  def destroy
    @event.destroy
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit(
      :id,
      :event_type,
      :event_date,
      :title,
      :speaker,
      :host,
      :published,
      :created_at,
      :updated_at
    )
  end
end
