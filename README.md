Librairie de composants React

# Form

## CustomForm

props :
|nom|type|defaut|
|---|---|---|
|onSubmit|fonction|() => {}|
|submitLabel|string|'Valider|
|cancelLabel|string|'Annuler|
|className|string|''|
|disabled|string|false|
|isLoading|string|false|
|onCancel|fonction|null|
|errorMessage|string|null|

exemple :

```jsx
<CustomForm
  onSubmit={submit}
  onCancel={cancel}
  isValid={isFormValid}
  errorMessage={errorMessage}
>
  <input
    type="text"
    value={libelle}
    onChange={(e) => setLibelle(e.target.value)}
  />
</CustomForm>
```

## CustomFormField

props :
|nom|type|defaut|
|---|---|---|
|label|string|null|
|value||null|
|onChange|fonction|() => {}|
|type|string|'text'|
|selectValues|array|[]|
|className|string|''|
|name|string|''|
|disabled|bool|false|
|isValid|bool|true|
|feedback|string|''|
|emptySelectOption|bool|false|
|prefix|string / fonction|null|

exemple : 
```jsx
 <CustomFormField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Nom du modèle"
            isValid={name != ''}
/>
```

## ListFormControl

props :
|nom|type|defaut|
|---|---|---|
|label|string|''|
|list|array|[]|
|setList|fonction|() => {}|
|titleActions|array|[]|
|fields|array|[]|
|titleClass|string|''|

exemple:
```jsx
 <ListFormControl
        label="Composantes essentielles"
        list={composantes}
        setList={setComposantes}
        titleActions={[
          {
            label: 'Ajouter une composante',
            onClick: () => setComposantes([...composantes, { libelle: '' }])
          }
        ]}
        fields={[{ propName: 'libelle', label: 'Libellé', required: true }]}
      />
```

## Subtitle
props :
|nom|type|defaut|
|---|---|---|
|actions |array| []|
|className |string| ''|

exemple:
```jsx
    <SubTitle
        actions={[
          {
            label: 'Ajouter un niveau',
            onClick: () => ...
          }
        ]}
      >
      Niveaux de développement
    </SubTitle>
```


## useFormField

paramètres:
* valeur par défaut
* callback de validité du champ de formulaire : val => bool

retourne:
* valeur
* set de la valeur
* is valeur valide

exemple:
```jsx
const [composantes, setComposantes, isComposantesValid] = useFormField(
    [{ libelle: '' }],
    (val) => val.length > 0 && val.every((obj) => obj.libelle != '')
  )
```

# Modal

## Confirm

### ConfirmContext, initConfirm et Confirm

ConfirmContext permet l'utilisation du hook useConfirm dans un composant sous jacent.
la fonction initConfirm renvoie une valeur par défaut à passer au ConfirmContext.
Il faut que dans ce context, le composant Confirm soit instancié.


```jsx
    const Composant = () => {
        const contextValue = initConfirm()
        return (
        <ConfirmContext.Provider value={contextValue}>
        <Confirm />
            ...
        <ConfirmContext.Provider/>
        )
    }

```

### useConfirm

    Retourne une fonction :
        * paramètres:
            * Message de confirmation
            * Fonction éxecutée à la confirmation

L'exécution de cette fonction permet l'affichage d'une fenêtre de confirmation


exemple:
```jsx

    const confirm = useConfirm()
    confirm("Veuillez confirmer la suppression", () =>remove())
```


## CustomModal
props :
|nom|type|defaut|
|---|---|---|
|show|bool|false|
|title|string|''|
|content| HTML |''|
|onValidate|fonction|() => {}|
|setShow|fonction|() => {}|
|validateLabel|string|'Enregistrer'|
|cancelLabel|string|'Annuler'|
|validateDisabled|bool|false|


exemple:
```jsx
<CustomModal
      title={'Ajouter un partenaire'}
      content={
        <PartenaireForm
          show={show}
          setShow={setShow}
          formfields={formfields}
          setFormFields={setFormFields}
        />
      }
      show={show}
      setShow={setShow}
      onValidate={submit}
    />
```