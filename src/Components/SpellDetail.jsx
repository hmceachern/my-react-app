// pages/ItemDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import spellList from '../assets/spellList.json';
import Navigation from './Navigate';

function SpellDetail() {
  const { spellName } = useParams(); // Get the ID from the URL
  const spell = spellList.find(spell => spell.name === spellName); // Find the item

  if (!spell) {
    return <div>Spell not found with name {spellName}!</div>;
  }

  // Render the item data dynamically
  return (
    <div>
      <Navigation />
      <h1>{spell.name}</h1>
      <p>School: {spell.school}</p>
      <p>Sub-School: {spell.subschool}</p>
      <p>Spell Level: {spell.spell_level}</p>
      <p>Casting Time: {spell.casting_time}</p>
      <p>Components: {spell.components}</p>
      <p>Range: {spell.range}</p>
      <p>Area: {spell.area}</p>
      <p>Effect: {spell.effect}</p>
      <p>Targets: {spell.targets}</p>
      <p>Duration: {spell.duration}</p>
      <p>Saving Throw: {spell.saving_throw}</p>
      <p>Spell Resistance: {spell.spell_resistance}</p>
      <p>Short Description: {spell.short_description}</p>
      <p>Description: {spell.description}</p>
    </div>
  );
}

export default SpellDetail;
