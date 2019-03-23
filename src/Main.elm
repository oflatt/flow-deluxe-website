module Main exposing (main)

import Browser
import Css exposing (..)
import Html
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)


main : Program () Model Msg
main =
    Browser.sandbox
        { view = view >> toUnstyled
        , update = update
        , init = initialModel
        }

-- MODEL

type alias PageName = String
type alias MousePos = (Float, Float)

type alias Model = {currentPage: PageName, highlightedButton: PageName}

initialModel : Model
initialModel = Model "Home" "none"


-- UPDATE

type Msg = ChangePage PageName | MouseOver PageName | MouseLeave PageName

update : Msg -> Model -> Model
update msg model = case msg of
                       ChangePage pageName -> Model pageName model.highlightedButton
                       MouseOver pageName -> Model model.currentPage pageName
                       MouseLeave pageName -> if pageName == model.highlightedButton
                                              then {model | highlightedButton = "none"}
                                              else model

-- VIEW

pageColor = (rgb 247 247 222)
pageBackgroundColor = (rgb 229 229 208)


view : Model -> Html Msg
view model =  
  div [ ]
      [ node "link" [rel "stylesheet"
                    ,href "https://fonts.googleapis.com/css?family=Tangerine"][]
      , node "link" [rel "stylesheet"
                    ,href "https://fonts.googleapis.com/css?family=Raleway"][]

       -- title
      ,(makeTitle)
      -- page buttons
      , (pagebutton "Home" model)
      ,(pagebutton "Listings" model)
      ,(pagebutton "Game" model)
                
      -- home page
      ,(makePage "Home" (text "hello") model)

      -- listing page
      , (makePage "Listings" (listing "../assets/placeholder.png"
                                  "Listing title" model)
             model)
      , (makePage "Game"
             (text "2")
             model)
      ]
      

makePage pageName content model =
    div [css[(pagedisplay pageName model)
            ,backgroundColor pageColor]]
        [content]
      
makeTitle = div
            [css [
              backgroundColor (rgb 165 220 255)
             ,height (px 90)
             ,width (pct 100)
                ]
               ]
            [div[css[
                  textAlign (center)
                 ,padding (px 20)
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
                
                
pagebutton pageName model =
    let buttonPageColor =
            if pageName == model.currentPage
            then pageColor
            else pageBackgroundColor
    in
    button [
         onClick (ChangePage pageName)
        ,onMouseOver (MouseOver pageName)
        ,onMouseLeave (MouseLeave pageName)
        ,css
             [width (pct 20)
             ,height (px 50)
             ,marginTop (px 10)
             ,marginRight (px 10)
             ,borderTopLeftRadius (px 8)
             ,borderTopRightRadius (px 8)
             ,if pageName == model.highlightedButton
              then border (px 2)
              else border (px 0)
             ,borderColor (rgb 0 0 0)
             ,borderBottomColor buttonPageColor
             ,outline none
             ,borderStyle solid
             ,backgroundColor buttonPageColor
             ,fontFamilies ["Raleway"]
             ,fontSize (px 20)
             ]]
    [text pageName]
        
        
pagedisplay pagename model = if model.currentPage == pagename then display block else display none
                                     
                                     
                                     
listing imgName title model =
    div []
        [img [src imgName
             , css [
                   left (pct 10)
                  ,bottom (px 10)
                  ,height (pct 50)
                  ]][]
         ,text title]
