module Main exposing (main)


import Browser
import Browser.Navigation as Nav
import Css exposing (..)
import Html
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)
import Url
import Url.Builder
import Tuple

import Debug exposing (log)


main : Program () Model Msg
main =
    Browser.application
        { view = view
        , subscriptions = subscriptions
        , update = update
        , init = initialModel
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }


        
-- MODEL

type alias PageName = String
type alias MousePos = (Float, Float)

type alias Model = {currentPage: PageName
                   ,highlightedButton: PageName
                   ,urlkey : Nav.Key
                   ,url : Url.Url
                   ,indexurl : String}

getindexurl url =
    let str = (Url.toString url)
    in
    (String.slice 0 ((String.length str)-(String.length url.path)) str)

initialModel : () -> Url.Url -> Nav.Key -> (Model, Cmd Msg)
initialModel flags url key = (Model (urlToPageName url) "none" key url (getindexurl url), Cmd.none)


-- SUBSCRIPTIONS

subscriptions : Model -> Sub msg
subscriptions model = Sub.none

-- UPDATE

type Msg = MouseOver PageName | MouseLeave PageName | LinkClicked Browser.UrlRequest | PageChange String | UrlChanged Url.Url


changeUrl : Model -> Url.Url -> PageName -> (Model, Cmd Msg)
changeUrl model newurl newPage =
    ( { model | currentPage = newPage
         ,url = newurl}
       , Nav.pushUrl model.urlkey (Url.toString newurl)
       )

changeByName model pageName =
    let newurl =
            case (Url.fromString
                      (String.append
                           model.indexurl
                           (Url.Builder.absolute
                                [pageName] []))) of
                Nothing ->
                    model.url
                Just url -> url

    in changeUrl model newurl pageName


urlToPageName url =
    if url.path == "" then
        "Home"
    else
        (String.slice 1 (String.length url.path) url.path)
         
update : Msg -> Model -> (Model, Cmd Msg)
update msg model = case msg of
                       LinkClicked urlRequest ->
                           case urlRequest of
                               Browser.Internal url ->
                                   (changeByName model (urlToPageName url))
                                       
                               Browser.External href ->
                                   ( model, Nav.load href )

                       PageChange pageName ->
                           let result = (changeByName model pageName)
                           in log "pagechange" result
                                        

                       UrlChanged url ->
                           ((Tuple.first (changeByName model (urlToPageName url))),
                           Cmd.none)
                       
                       MouseOver pageName -> ({model | highlightedButton = pageName}, Cmd.none)
                       MouseLeave pageName -> if pageName == model.highlightedButton
                                              then ({model | highlightedButton = "none"}, Cmd.none)
                                              else (model, Cmd.none)

                                                  
-- VIEW

pageColor = (rgb 247 247 222)
pageBackgroundColor = (rgb 229 229 208)


view : Model -> Browser.Document Msg
view model =
    {title = "flow deluxe"
    , body =
        [toUnstyled
             (div [ ]
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
                  , (makePage "Listings" (listing "./assets/placeholder.png"
                                              "Listing title" model)
                         model)
                  , (makePage "Game"
                         (text "2")
                         model)
                  ])]
    }
      

makePage pageName content model =
    if pageName == log "current" model.currentPage then
        div [css[display block
                ,backgroundColor pageColor]]
            [content]
    else
        text ""
      
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
                

pagebutton : PageName -> Model -> Html Msg
pagebutton pageName model =
    let buttonPageColor =
            if pageName == model.currentPage
            then pageColor
            else pageBackgroundColor
    in
    button [
         onClick (PageChange pageName)
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
