module Main exposing (main)

import Browser
import Css exposing (..)
import Html
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick)


main : Program () Model Msg
main =
    Browser.sandbox
        { view = view >> toUnstyled
        , update = update
        , init = initialModel
        }

-- MODEL

type alias PageName = String

type alias Model = {currentPage: PageName}

initialModel : Model
initialModel = Model "home"


-- UPDATE

type Msg = ChangePage PageName

update : Msg -> Model -> Model
update msg model = case msg of
                       ChangePage pageName -> Model pageName

-- VIEW


view : Model -> Html Msg
view model =  
  div []
      [ node "link" [rel "stylesheet"
                    ,href "https://fonts.googleapis.com/css?family=Tangerine"][]
      , node "link" [rel "stylesheet"
                    ,href "https://fonts.googleapis.com/css?family=Raleway"][]

       -- title
      ,div[css [
            backgroundColor (rgb 165 220 255)
           ,height (px 90)
           ,width (pct 100)
           ]
          ]
            [div[css[
                  textAlign (center)
                 ,border (px 10)
                 ]
                ]
                 [div[css[
                       fontFamilies ["Raleway"]
                      ,fontSize (px 32)
                      ,top (px 10)
                      ,display (inlineBlock)
                      ]]
                      [text "FLOW"]
                 ,div[css[fontFamilies ["Tangerine, serif"]
                         ,fontSize (px 40)
                         ,fontStyle italic
                         ,color (rgb 247 54 105)
                         ,display inlineBlock
                         ]
                     ]
                      [text "Deluxe"]]]

      -- page buttons
      , (pagebutton "home")
                
      -- home page
      , (listing "../assets/placeholder.png"
             "Listing title" model)

      -- listing page
      ]


pagebutton pageName = button [onClick (ChangePage pageName)
                             ,css
                             [width (pct 20)
                             ,height (px 50)
                             ]]
                      [text pageName]

      
pagedisplay pagename model = if model.currentPage == pagename then display block else display none

                             

listing imgName title model =
    div [css[(pagedisplay "listings" model)]]
        [img [src imgName
             , css [
                   left (pct 10)
                  ,top (px 10)
                  ,height (pct 50)
                  ]][]
         ,text title]
