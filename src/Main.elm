import Browser
import Html exposing (Html, button, div, text, node)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)


main =
  Browser.sandbox { init = init, update = update, view = view }


-- MODEL

type alias Model = Int

init : Model
init =
  0


-- UPDATE

type Msg = Increment | Decrement

update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1


-- VIEW


view : Model -> Html Msg
view model =  
  div []
      [ node "link" [rel "stylesheet"
                    ,href "https://fonts.googleapis.com/css?family=Tangerine"][]
      , node "link" [rel "stylesheet"
                    ,href "https://fonts.googleapis.com/css?family=Raleway"][]
      ,div[ style "background-color" "rgb(165, 220, 255)"
          , style "height" "90px"
          , style "width" "100%"
          ]
            [div[style "text-align" "center"]
                 [div[style "font-family" "Raleway,Light"
                     ,style "font-size" "32px"
                     ,style "font-style" "Light"
                     ,style "margin-top" "10px"
                     ,style "display" "inline-block"]
                      [text "FLOW"]
                 ,div[style "font-family" "Tangerine,serif"
                     ,style "font-size" "40px"
                     ,style "font-style" "italic"
                     ,style "color" "rgb(247, 54, 105)"
                     ,style "display" "inline-block"]
                 [text "Deluxe"]]]
      , button [ onClick Decrement ] [ text "-" ]
      , div [] [ text (String.fromInt model) ]
      , button [ onClick Increment ] [ text "+" ]
      ]
